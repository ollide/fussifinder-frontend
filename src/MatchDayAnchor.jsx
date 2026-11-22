import React from 'react';

import { ChevronIcon } from './icons';

// Scrolls to a day here instead of following the hash: a hash navigation fires popstate, which gives the router
// a new location key and remounts Main (restarting the match stream)
const scrollTo = (event, id) => {
    event.preventDefault();
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
};

// Links to the previous and next day (the ids are on the days' sections: a stuck header isn't where its day starts)
class MatchDayAnchor extends React.Component {

    render() {
        const anchor = 'matchday';
        const day = this.props.index + 1;

        const prevId = (day === 1) ? undefined : `${anchor}${day - 1}`;
        const nextId = (day < this.props.total) ? `${anchor}${day + 1}` : undefined;
        return (
            <>
                <a href={prevId && `#${prevId}`}
                    onClick={prevId && (e => scrollTo(e, prevId))}
                    className={'matchday-anchor prev' + (prevId ? '' : ' disabled')}
                    aria-label="Vorheriger Spieltag"
                    aria-disabled={!prevId || undefined}
                >
                    <ChevronIcon size={18} />
                </a>
                <a href={nextId && `#${nextId}`}
                    onClick={nextId && (e => scrollTo(e, nextId))}
                    className={'matchday-anchor next' + (nextId ? '' : ' disabled')}
                    aria-label="Nächster Spieltag"
                    aria-disabled={!nextId || undefined}
                >
                    <ChevronIcon size={18} />
                </a>
            </>
        )
    }
}

export default MatchDayAnchor;
