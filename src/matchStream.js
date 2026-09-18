import CONFIG from './config';
import { busyError, groupMatchesByDate, streamError } from './util';

const PARTIAL_MESSAGE = 'Einige Spiele konnten nicht geladen werden. Die Liste ist möglicherweise unvollständig.';

// Keep the finished progress bar visible briefly, then fade it out
const FADE_DELAY_MS = 500;
const FADE_DURATION_MS = 300;

const parse = (event) => {
    try {
        return JSON.parse(event.data);
    } catch {
        return null;
    }
};

/**
 * Consumes an SSE match stream (see the backend's SseStream for the event protocol) and reports the resulting
 * UI state through `update`, which receives partial state objects (e.g. `component.setState`).
 *
 * @returns a function that stops the stream and any pending timers
 */
export const startMatchStream = (path, params, update) => {
    const query = new URLSearchParams(params).toString();
    const es = new EventSource(`${CONFIG.baseApiUrl}${path}?${query}`);

    let matches = [];
    let total = 0;
    let timer = null;

    const stop = () => {
        es.close();
        clearTimeout(timer);
    };

    const fail = (serverFailed = false) => {
        stop();
        update({ isLoading: false, streamProgress: null, error: streamError(total, matches.length, serverFailed) });
    };

    es.addEventListener('init', (e) => {
        total = parse(e)?.total ?? 0;
        update({ streamProgress: { current: 0, total } });
    });

    es.addEventListener('matches', (e) => {
        const batch = parse(e);
        if (!Array.isArray(batch)) return;
        matches = [...matches, ...batch];
        update({ isLoading: false, matchDays: groupMatchesByDate(matches) });
    });

    es.addEventListener('progress', (e) => {
        const progress = parse(e);
        if (progress) update({ streamProgress: progress });
    });

    es.addEventListener('complete', (e) => {
        stop();
        update({ isLoading: false, warning: parse(e)?.partial ? PARTIAL_MESSAGE : null });
        timer = setTimeout(() => {
            update({ streamFading: true });
            timer = setTimeout(() => update({ streamProgress: null, streamFading: false }), FADE_DURATION_MS);
        }, FADE_DELAY_MS);
    });

    // The server is at capacity. Sent as an event, since EventSource can't read the status of a 503.
    es.addEventListener('busy', () => {
        stop();
        update({ isLoading: false, streamProgress: null, error: busyError() });
    });

    // 'error' is both a server event (has data) and EventSource's transport error (has none)
    es.addEventListener('error', (e) => {
        if (typeof e.data !== 'string') {
            // Never let EventSource auto-reconnect: the server would restart the whole crawl
            fail();
        } else if (parse(e)?.fatal) {
            fail(true);
        } else {
            // A single zip failed, the crawl continues
            update({ warning: PARTIAL_MESSAGE });
        }
    });

    return stop;
};
