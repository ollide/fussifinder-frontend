import React from 'react';

import './MatchDayAnchor.scss';

class MatchDayAnchor extends React.Component {

    render() {
        const anchor = 'matchday';
        const day = this.props.index + 1;

        const prevAnchor = (day === 1) ? null : `#${anchor}${day - 1}`;
        const nextAnchor = `#${anchor}${day + 1}`;
        const hasNext = day < this.props.total;
        return (
            <>
                <a id={anchor + day}
                    href={prevAnchor}
                    className={'matchday-anchor prev ' + (!prevAnchor && 'disabled')}
                >
                    <i className="icon-angle-up"></i>
                </a>
                <a href={nextAnchor} className={'matchday-anchor next ' + (!hasNext && 'disabled')}>
                    <i className="icon-angle-down"></i>
                </a>
            </>
        )
    }
}

export default MatchDayAnchor;
