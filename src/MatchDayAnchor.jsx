import React from 'react';

import { ChevronIcon } from './icons';

class MatchDayAnchor extends React.Component {

    render() {
        const anchor = 'matchday';
        const day = this.props.index + 1;

        const prevAnchor = (day === 1) ? undefined : `#${anchor}${day - 1}`;
        const nextAnchor = `#${anchor}${day + 1}`;
        const hasNext = day < this.props.total;
        return (
            <>
                <a id={anchor + day}
                    href={prevAnchor}
                    className={'matchday-anchor prev' + (prevAnchor ? '' : ' disabled')}
                    aria-label="Vorheriger Spieltag"
                    aria-disabled={!prevAnchor || undefined}
                >
                    <ChevronIcon size={18} />
                </a>
                <a href={hasNext ? nextAnchor : undefined}
                    className={'matchday-anchor next' + (hasNext ? '' : ' disabled')}
                    aria-label="Nächster Spieltag"
                    aria-disabled={!hasNext || undefined}
                >
                    <ChevronIcon size={18} />
                </a>
            </>
        )
    }
}

export default MatchDayAnchor;
