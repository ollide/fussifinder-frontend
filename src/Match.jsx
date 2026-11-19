import React from 'react';

import './Match.css'
import { FilterContext } from './FilterContext';
import MatchDetails from './MatchDetails';
import { ChevronIcon } from './icons';

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
                    }
                    const { showDetails } = this.state;
                    const detailsId = `match-details-${match.id}`;
                    return (
                        <article className="match card">
                            <div className="match-main">
                                <div className="match-time">{match.kickoff}</div>
                                <div className="match-teams">
                                    <div className="match-team">{match.clubHome}</div>
                                    <div className="match-team">{match.clubAway}</div>
                                    <div className="match-meta">{match.teamType} · {match.league}</div>
                                </div>
                                <div className="match-tags" aria-hidden="true">
                                    <span className="match-tag">{match.teamType}</span>
                                    <span className="match-tag">{match.league}</span>
                                </div>
                                <div className="match-actions">
                                    <a className="match-action match-link" href={match.url}
                                        target="_blank" rel="noopener noreferrer"
                                        aria-label="Spiel auf fussball.de öffnen">
                                        <i className="icon-link-ext" aria-hidden="true"></i>
                                    </a>
                                    <button className="match-action match-toggle"
                                        aria-label={showDetails ? 'Details ausblenden' : 'Details anzeigen'}
                                        aria-expanded={showDetails}
                                        aria-controls={showDetails ? detailsId : undefined}
                                        onMouseDown={preventFocus} onClick={this.toggleDetails}>
                                        <ChevronIcon className={'match-chevron' + (showDetails ? ' is-open' : '')} />
                                    </button>
                                </div>
                            </div>

                            {showDetails && <MatchDetails id={match.id} domId={detailsId} />}
                        </article>)
                }}
            </FilterContext.Consumer>
        )
    }
}

export default Match;
