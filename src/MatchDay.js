import React from 'react';

import Match from './Match';

class MatchDay extends React.Component {

    render() {
        return (
            <>
                <div className="matchday">
                    <h2 className="subtitle">{this.props.matchDay.day}</h2>
                </div>
                {this.props.matchDay.matches.map((match) => <Match key={match.url} match={match} />)}
            </>
        )
    }
}

export default MatchDay;
