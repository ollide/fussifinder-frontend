import React from 'react';

import './Match.scss'
import { FilterContext } from './FilterContext';
import MatchDetails from './MatchDetails';

import { preventFocus } from './util';

class Match extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
        };
    }

    toggleDetails = () => {
        this.setState((state) => ({ showDetails: !state.showDetails }));
    }

    render() {
        const match = this.props.match;
        if (/android/i.test(navigator.userAgent)) {
            // Fix links not opening in app
            match.url = match.url.replace('https:', 'http:');
        }

        return (
            <FilterContext.Consumer>
                {context => {
                    const visible = context.isVisible(match.teamTypeKey, match.leagueKey);
                    if (!visible) {
                        return <></>
                    } else {
                        return (
                            <>
                                <div className="match columns is-multiline is-mobile is-vcentered">
                                    <div className="column is-11 match-header">
                                        {match.kickoff}&nbsp;
                    <span className="team-type">{match.teamType}</span>&nbsp;
                    <span className="team-league">{match.league}</span>
                                    </div>
                                    <div className="column is-1 match-header right">
                                        <a href={match.url} target="_blank" rel="noopener noreferrer">
                                            <i className="icon-link-ext"></i>
                                        </a>
                                    </div>

                                    <div className="column is-5 home-team">
                                        {match.clubHome}
                                    </div>
                                    <div className="column is-1 match-separator">:</div>
                                    <div className="column is-5 away-team">
                                        {match.clubAway}
                                    </div>

                                    <div className="column is-1 match-details">
                                        <button tabIndex="0" onMouseDown={preventFocus} onClick={this.toggleDetails}>
                                            <i className={this.state.showDetails ? "icon-angle-up" : "icon-angle-down"}></i>
                                        </button>
                                    </div>

                                    {this.state.showDetails && <MatchDetails id={match.id} />}
                                </div>
                            </>)
                    }
                }}
            </FilterContext.Consumer>
        )
    }
}

export default Match;
