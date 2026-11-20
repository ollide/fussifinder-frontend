import React from 'react';

import FilterLeagueButton from './FilterLeagueButton';
import FilterTeamButton from './FilterTeamButton';
import FilterPeriodButton from './FilterPeriodButton';
import DateFilter from './DateFilter';
import './Filter.css';
import { FilterContext } from './FilterContext';
import { ChevronIcon, FilterIcon } from './icons';

const TEAMS = [
    { filter: 'Herren' },
    { filter: 'Frauen' },
    { filter: 'Ü32' },
    { filter: 'A-Jun', abbrv: 'U19', name: 'A-JuniorInnen' },
    { filter: 'B-Jun', abbrv: 'U17', name: 'B-JuniorInnen' },
];

const LEAGUES = [
    { filter: 'VL', name: 'Verbandsliga' },
    { filter: 'LL', name: 'Landesliga' },
    { filter: 'BL', name: 'Bezirksliga' },
    { filter: 'KL', name: 'Kreisliga' },
    { filter: 'KK', name: 'Kreisklasse' },
    { filter: 'FS', name: 'Freundschaftsspiele' },
    { filter: 'P', name: 'Pokal' },
];

const PERIODS = { T: 'Heute', D3: '3 Tage', D7: '7 Tage' };

const lsKey = 'filter-open';
const dateFormat = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit' });

const periodLabel = (period) => PERIODS[period]
    || (/^\d{4}-\d{2}-\d{2}$/.test(period) ? dateFormat.format(new Date(period)) : period);

// Mobile: collapsed to a summary row by default (remembered); desktop: always open as sidebar.
// `summary`: extra summary parts for the children (e.g. perimeter)
class Filter extends React.Component {

    state = {
        open: (() => {
            try {
                return localStorage.getItem(lsKey) === 'true';
            } catch {
                return false;
            }
        })(),
    }

    toggleOpen = () => {
        this.setState((state) => {
            try {
                localStorage.setItem(lsKey, String(!state.open));
            } catch {
                // remembering is a convenience only
            }
            return { open: !state.open };
        });
    }

    render() {
        const matches = (this.props.matchDays || []).flatMap(day => day.matches);

        return (
            <FilterContext.Consumer>
                {(context) => {
                    // Number of matches that a switched-off filter would add: those of its team type / league
                    // that pass the other filter row (a match hidden by both rows isn't shown by either alone)
                    const teamCount = (key) => matches
                        .filter(m => m.teamTypeKey === key && context.league[m.leagueKey]).length;
                    const leagueCount = (key) => matches
                        .filter(m => m.leagueKey === key && context.team[m.teamTypeKey]).length;

                    const mobileDevice = window.isMobile;
                    const collapsible = context.isMobile;
                    const open = !collapsible || this.state.open;

                    const summary = [
                        TEAMS.filter(t => context.team[t.filter]).map(t => t.abbrv || t.filter).join(', ') || 'keine Altersklasse',
                        LEAGUES.filter(l => context.league[l.filter]).map(l => l.filter).join(', ') || 'keine Spielklasse',
                        // single parts don't break inside ("3 Tage")
                        ...[periodLabel(context.period), ...(this.props.summary || [])].map(p => p.replace(/ /g, '\u00a0')),
                    ].join(' · ');

                    return (
                    <aside className={'card filter-card' + (collapsible ? ' is-collapsible' : '')} aria-label="Filter">
                        {collapsible &&
                            <button className="filter-toggle" aria-expanded={open} aria-controls="filter-body"
                                onClick={this.toggleOpen}>
                                <FilterIcon />
                                <span className={'filter-toggle-text' + (open ? ' is-open' : '')}>
                                    {open ? 'Filter' : summary}
                                </span>
                                <ChevronIcon className={'filter-chevron' + (open ? ' is-open' : '')} />
                            </button>}

                        {open &&
                            <div className="filter-body" id="filter-body">
                                <div className="filter-section">
                                    <h2 className="section-label">Altersklassen</h2>
                                    <div className="chips team-type-filter">
                                        {TEAMS.map(t => <FilterTeamButton key={t.filter} {...t} count={teamCount(t.filter)} />)}
                                    </div>
                                </div>

                                <div className="filter-section">
                                    <h2 className="section-label">Spielklassen</h2>
                                    <div className="chips league-filter">
                                        {LEAGUES.map(l => <FilterLeagueButton key={l.filter} {...l} count={leagueCount(l.filter)} />)}
                                    </div>
                                </div>

                                <div className="filter-section">
                                    <h2 className="section-label">Zeitraum</h2>
                                    <div className="segmented period-filter" role="group" aria-label="Zeitraum">
                                        {Object.entries(PERIODS).map(([filter, name]) =>
                                            <FilterPeriodButton key={filter} filter={filter} name={name} />)}
                                        {mobileDevice && <DateFilter />}
                                    </div>
                                    {!mobileDevice && <DateFilter />}
                                </div>

                                {this.props.children}
                            </div>}
                    </aside>
                    );
                }}
            </FilterContext.Consumer>
        )
    }
}

export default Filter;
