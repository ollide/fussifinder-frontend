import React from 'react';

import './Match.css'
import { FilterContext } from './FilterContext';
import MatchDetails from './MatchDetails';
import { ChevronIcon, ExternalLinkIcon } from './icons';

import { preventFocus } from './util';

class Match extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
        };
    }

    // The whole row toggles the details (the chevron button is the control for keyboard and screen readers;
    // its clicks bubble up to here). Not the fussball.de link, and not after selecting a club name's text.
    onRowClick = (e) => {
        if (e.target.closest('a') || (window.getSelection?.().toString() && !e.target.closest('button'))) {
            return;
        }
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
                    // a hidden match only shows when its day reveals its hidden matches, marked with what hides it
                    const hiddenBy = context.hiddenBy(match);
                    if (hiddenBy.length && !this.props.revealed) {
                        return null;
                    }
                    const off = (part) => hiddenBy.includes(part);
                    const { showDetails } = this.state;
                    const detailsId = `match-details-${match.id}`;
                    return (
                        <article className={'match card' + (hiddenBy.length ? ' is-hidden' : '')}
                            aria-label={hiddenBy.length ? `Ausgeblendet: ${hiddenBy.join(', ')}` : undefined}>
                            <div className="match-main" onClick={this.onRowClick}>
                                <div className="match-time">{match.kickoff}</div>
                                <div className="match-teams">
                                    <div className="match-team">{match.clubHome}</div>
                                    <div className="match-team">{match.clubAway}</div>
                                    {hiddenBy.length ?
                                        <div className="match-meta">
                                            {[match.teamType, match.league].map(part => off(part)
                                                ? <span key={part} className="match-off">{part}</span>
                                                : <span key={part}>{part}</span>)}
                                        </div> :
                                        <div className="match-meta">{match.teamType} · {match.league}</div>}
                                </div>
                                <div className="match-tags" aria-hidden="true">
                                    {[match.teamType, match.league].map(part =>
                                        <span key={part} className={'match-tag' + (off(part) ? ' is-off' : '')}>
                                            {part}
                                        </span>)}
                                </div>
                                <div className="match-actions">
                                    <a className="match-action match-link" href={match.url}
                                        target="_blank" rel="noopener noreferrer"
                                        aria-label="Spiel auf fussball.de öffnen">
                                        <ExternalLinkIcon />
                                    </a>
                                    <button className="match-action match-toggle"
                                        aria-label={showDetails ? 'Details ausblenden' : 'Details anzeigen'}
                                        aria-expanded={showDetails}
                                        aria-controls={showDetails ? detailsId : undefined}
                                        onMouseDown={preventFocus}>
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
