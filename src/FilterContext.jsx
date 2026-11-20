import React from 'react';
import { useContext } from "react";

import { DEFAULT_KM, DEFAULT_REGION, NEARBY, sameRegion } from './regions';

export const FilterContext = React.createContext()

export function useAppContext() {
    return useContext(FilterContext);
}

const desktopWidth = 1024;
const MAX_RECENTS = 4;

const isRegion = (r) => r && typeof r.type === 'string' && typeof r.name === 'string';

// Recent regions from localStorage; before routes existed only the last region was stored (key 'region')
const loadRecents = (perimeter) => {
    try {
        const recents = JSON.parse(localStorage.getItem('recent-regions'));
        if (Array.isArray(recents) && recents.length) {
            return recents.filter(isRegion).slice(0, MAX_RECENTS);
        }
        const region = JSON.parse(localStorage.getItem('region'));
        localStorage.removeItem('region');
        if (isRegion(region)) {
            // the old postal code region becomes a search around that postal code
            return [region.type === 'ZIP' ? { type: NEARBY, name: region.name, km: perimeter / 1000 } : region];
        }
    } catch {
        localStorage.removeItem('recent-regions');
    }
    return [DEFAULT_REGION];
};

export class FilterProvider extends React.Component {
    constructor(props) {
        super(props);

        this.isMobile = () => {
            return window.innerWidth < desktopWidth;
        }
        this.updateViewType = () => {
            this.setState({ isMobile: this.isMobile() });
        }

        this.toggleTeam = (key) => {
            this.setState(state => ({ team: { ...state.team, [key]: !state.team[key] } }));
        }

        this.toggleLeague = (key) => {
            this.setState(state => ({ league: { ...state.league, [key]: !state.league[key] } }));
        }

        this.setPeriod = (period) => {
            this.setState({ period });
            if (period === '') {
                this.setPeriod('D3');
            }
        }

        this.setPerimeter = (perimeter) => {
            this.setState({ perimeter });
        }

        this.isVisible = (teamKey, leagueKey) => {
            return this.state.league[leagueKey] && this.state.team[teamKey];
        }

        // What hides a match: its team type and/or league, as shown on the match ([] if it's visible)
        this.hiddenBy = (match) => [
            ...(this.state.team[match.teamTypeKey] ? [] : [match.teamType]),
            ...(this.state.league[match.leagueKey] ? [] : [match.league]),
        ]

        // Most recently shown regions, newest first; the first one is what '/' opens
        this.addRecent = (region) => {
            this.setState(state => ({
                recents: [region, ...state.recents.filter(r => !sameRegion(r, region))].slice(0, MAX_RECENTS),
            }));
        }

        const period = localStorage.getItem('period') || 'D3';
        const perimeter = localStorage.getItem('perimeter') || String(DEFAULT_KM * 1000);

        this.state = {
            isMobile: this.isMobile(),
            recents: loadRecents(perimeter),
            addRecent: this.addRecent,

            team: {
                Herren: true,
                Frauen: true,
                'Ü32': false,
                'A-Jun': true,
                'B-Jun': false,
                'C-Jun': false,
            },
            league: {
                B: true,
                RL: true,
                VL: true,
                LL: true,
                BL: true,
                KL: false,
                KK: false,
                FS: false,
                P: true,
            },
            period,
            perimeter,
            toggleTeam: this.toggleTeam,
            toggleLeague: this.toggleLeague,
            setPeriod: this.setPeriod,
            setPerimeter: this.setPerimeter,
            isVisible: this.isVisible,
            hiddenBy: this.hiddenBy,
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateViewType);

        const team = JSON.parse(localStorage.getItem('team')) || {};
        const league = JSON.parse(localStorage.getItem('league')) || {};
        this.setState((state) => (
            {
                team: {
                    ...state.team,
                    ...team,
                },
                league: {
                    ...state.league,
                    ...league,
                }
            }));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateViewType);
    }

    componentDidUpdate() {
        const { recents, team, league, period, perimeter } = this.state;
        localStorage.setItem('recent-regions', JSON.stringify(recents));
        localStorage.setItem('team', JSON.stringify(team));
        localStorage.setItem('league', JSON.stringify(league));
        localStorage.setItem('period', period);
        localStorage.setItem('perimeter', perimeter);
    }

    render() {
        return <FilterContext.Provider value={this.state}>{this.props.children}</FilterContext.Provider>
    }
}
