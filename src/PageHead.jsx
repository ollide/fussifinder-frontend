import React from 'react';

import MatchSummary from './MatchSummary';

// Page title, match summary and the stream's progress bar
const PageHead = ({ title, firstLoad, isLoading, matchDays, streamProgress, streamFading }) => (
    <div className="page-head">
        <h1 className="page-title">{title}</h1>

        {!firstLoad && <>
            <p className="page-subtitle">
                {isLoading ? <>Spiele werden geladen…</> :
                    <MatchSummary matchDays={matchDays} />}
            </p>
            <progress
                className={`stream-progress${!streamProgress ? ' is-hidden' : streamFading ? ' is-fading' : ''}`}
                value={streamProgress?.current ?? 0}
                max={streamProgress?.total ?? 1}
                aria-label="Ladefortschritt"
            />
        </>}
    </div>
);

export default PageHead;
