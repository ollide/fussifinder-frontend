import React from 'react';

import './MatchDay.css'
import Match from './Match';
import MatchDayAnchor from './MatchDayAnchor';
import { FilterContext } from './FilterContext';
import { ChevronIcon, EyeOffIcon } from './icons';

const dateFormat = new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: '2-digit', month: '2-digit' });

const spiele = (n) => `${n} ${n === 1 ? 'Spiel' : 'Spiele'}`;

// One day's matches. Matches hidden by the filters can be shown for this day only ("peek"), dimmed and
// marked with what hides them; the filters stay as they are.
class MatchDay extends React.Component {

    state = {
        revealed: false,
    }

    toggleRevealed = () => {
        this.setState(state => ({ revealed: !state.revealed }));
    }

    render() {
        const { matchDay, index, total } = this.props;
        const { revealed } = this.state;
        const day = dateFormat.format(new Date(matchDay.day));
        const hidden = matchDay.matches.filter(m => this.context.hiddenBy(m).length);
        const visible = matchDay.matches.length - hidden.length;
        const listId = `matchday${index + 1}-matches`;

        return (
            <section id={`matchday${index + 1}`} className="matchday" aria-label={day}>
                <div className="matchday-header">
                    <h2 className="matchday-title">{day}</h2>
                    <div className="matchday-nav">
                        <span className="matchday-count">
                            {visible ? spiele(visible) : `${hidden.length} ausgeblendet`}
                        </span>
                        <MatchDayAnchor index={index} total={total} />
                    </div>
                </div>

                {!visible &&
                    <div className="matchday-hidden">
                        <EyeOffIcon />
                        <div className="matchday-hidden-text">
                            <span>{spiele(hidden.length)} ausgeblendet</span>
                            <span className="matchday-hidden-reasons">
                                {[...new Set(hidden.flatMap(m => this.context.hiddenBy(m)))].join(' · ')}
                            </span>
                        </div>
                        <button className="btn btn-small" aria-expanded={revealed} aria-controls={listId}
                            onClick={this.toggleRevealed}>
                            {revealed ? 'Verbergen' : 'Anzeigen'}
                        </button>
                    </div>}

                <div className="matchday-matches" id={listId}>
                    {matchDay.matches.map((match) => <Match key={match.id} match={match} revealed={revealed} />)}
                </div>

                {visible > 0 && hidden.length > 0 &&
                    <button className="matchday-peek" aria-expanded={revealed} aria-controls={listId}
                        onClick={this.toggleRevealed}>
                        <EyeOffIcon />
                        <span>{revealed ? `${hidden.length} ausgeblendete verbergen` : `+ ${hidden.length} ausgeblendete anzeigen`}</span>
                        <ChevronIcon size={16} className={'matchday-peek-chevron' + (revealed ? ' is-open' : '')} />
                    </button>}
            </section>
        )
    }
}

MatchDay.contextType = FilterContext;

export default MatchDay;
