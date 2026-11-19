import React from 'react';

import './MatchDay.css'
import Match from './Match';
import MatchDayAnchor from './MatchDayAnchor';
import { FilterContext } from './FilterContext';

const dateFormat = new Intl.DateTimeFormat('default', { weekday: 'long', day: '2-digit', month: '2-digit' });

class MatchDay extends React.Component {

    render() {
        const { matchDay, index, total } = this.props;
        const day = dateFormat.format(new Date(matchDay.day));
        const visible = matchDay.matches
            .filter(m => this.context.isVisible(m.teamTypeKey, m.leagueKey)).length;
        return (
            <section className="matchday" aria-label={day}>
                <div className="matchday-header">
                    <h2 className="matchday-title">{day}</h2>
                    <div className="matchday-nav">
                        <span className="matchday-count">{visible} {visible === 1 ? 'Spiel' : 'Spiele'}</span>
                        <MatchDayAnchor index={index} total={total} />
                    </div>
                </div>
                {matchDay.matches.map((match) => <Match key={match.id} match={match} />)}
            </section>
        )
    }
}

MatchDay.contextType = FilterContext;

export default MatchDay;
