import React from 'react';

import './MatchDay.scss'
import Match from './Match';
import MatchDayAnchor from './MatchDayAnchor';

class MatchDay extends React.Component {

    render() {
        const dateFormat = new Intl.DateTimeFormat('default',
            { weekday: 'long', day: '2-digit', month: '2-digit', year: '2-digit' });
        const day = dateFormat.format(new Date(this.props.matchDay.day));
        return (
            <>
                <div className="matchday">
                    <h2 className="subtitle">
                        {day}
                        <MatchDayAnchor index={this.props.index} />
                    </h2>
                </div>
                {this.props.matchDay.matches.map((match) => <Match key={match.url} match={match} />)}
            </>
        )
    }
}

export default MatchDay;
