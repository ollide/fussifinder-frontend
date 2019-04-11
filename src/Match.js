import React from 'react';

import './Match.scss'
import { FilterContext } from './FilterContext';
import MatchDetails from './MatchDetails';

class Match extends React.Component {

    state = {
        showDetails: false,
    }

    toggleDetails = () => {
        this.setState((state) => ({ showDetails: !state.showDetails }));
    }

    render() {
        const match = this.props.match;

        const dateFormat = new Intl.DateTimeFormat('default', { hour: '2-digit', minute: '2-digit' });
        const kickOff = dateFormat.format(new Date(match.date));
        return (

            <FilterContext.Consumer>
                {context => {
                    const visible = context.isVisible(match.teamType, match.league);
                    if (!visible) {
                        return <></>
                    } else {
                        return (
                            <>
                                <div className="match columns is-multiline is-mobile is-vcentered">
                                    <div className="column is-11 match-header">
                                        {kickOff}&nbsp;
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
                                        <a onClick={this.toggleDetails}>
                                            <i className={this.state.showDetails ? "icon-angle-up" : "icon-angle-down"}></i>
                                        </a>
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
