import React from 'react';

import MatchSummary from './MatchSummary';

// Page title, match summary and the stream's progress bar (drawn along the navbar's bottom edge)
const PageHead = ({ title, firstLoad, isLoading, matchDays, streamProgress, streamFading }) => {
    const streaming = streamProgress && streamProgress.current < streamProgress.total;
    return (
        <div className="page-head">
            <h1 className="page-title">{title}</h1>

            {!firstLoad && <>
                <p className="page-subtitle" aria-live="polite">
                    {isLoading ? <>Spiele werden geladen…</> :
                        <MatchSummary matchDays={matchDays} progress={streaming ? streamProgress : null} />}
                </p>
                {streamProgress && <progress
                    className={'stream-progress' + (streamFading ? ' is-fading' : '')}
                    value={streamProgress.current}
                    max={streamProgress.total || 1}
                    aria-label="Ladefortschritt"
                />}
            </>}
        </div>
    );
};

export default PageHead;
