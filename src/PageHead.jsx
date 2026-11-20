import React from 'react';

import MatchSummary from './MatchSummary';
import { ChevronIcon } from './icons';
import { NEARBY, regionLabel } from './regions';

// Page title with the region as a button that opens the region dialog, the match summary,
// and the stream's progress bar (a line along the top edge of the window)
const PageHead = ({ region, onRegionClick, isLoading, matchDays, streamProgress, streamFading }) => {
    const streaming = streamProgress && streamProgress.current < streamProgress.total;
    return (
        <div className="page-head">
            <h1 className="page-title">
                {region.type === NEARBY ? 'Fußball im Umkreis von' : 'Fußball in'}{' '}
                <button className="region-button" aria-haspopup="dialog" onClick={onRegionClick}
                    aria-label={`${regionLabel(region)}, Region ändern`}>
                    <span>{region.type === NEARBY ? region.name : regionLabel(region)}</span>
                    <ChevronIcon size={22} className="region-chevron" />
                </button>
            </h1>

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
        </div>
    );
};

export default PageHead;
