import React from 'react';
import { useContext } from "react";

export const FilterContext = React.createContext()

export function useAppContext() {
    return useContext(FilterContext);
}

const desktopWidth = 1088;

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

        this.setNearbyZip = (nearbyZip) => {
            this.setState({ nearbyZip });
        }

        this.isVisible = (teamKey, leagueKey) => {
            return this.state.league[leagueKey] && this.state.team[teamKey];
        }

        this.setRegion = (region) => {
            this.setState({ region });
        }

        let region;
        try {
            region = JSON.parse(localStorage.getItem('region'));
        } catch (e) {
            localStorage.removeItem('region');
        }
        region = region || {
            type: 'CITY',
            name: 'hamburg',
            displayName: 'Hamburg',
        };

        const period = localStorage.getItem('period') || 'D3';
        const perimeter = localStorage.getItem('perimeter') || '10000';
        const nearbyZip = localStorage.getItem('nearbyZip');

        this.state = {
            isMobile: this.isMobile(),
            region,
            setRegion: this.setRegion,

            team: {
                Herren: true,
                Frauen: true,
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
            nearbyZip,
            toggleTeam: this.toggleTeam,
            toggleLeague: this.toggleLeague,
            setPeriod: this.setPeriod,
            setPerimeter: this.setPerimeter,
            setNearbyZip: this.setNearbyZip,
            isVisible: this.isVisible,
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
        window.removeEventListener('resize', this.updateDimensions);
    }

    componentDidUpdate() {
        const { region, team, league, period, perimeter, nearbyZip } = this.state;
        localStorage.setItem('region', JSON.stringify(region));
        localStorage.setItem('team', JSON.stringify(team));
        localStorage.setItem('league', JSON.stringify(league));
        localStorage.setItem('period', period);
        localStorage.setItem('perimeter', perimeter);
        if (nearbyZip) {
            localStorage.setItem('nearbyZip', nearbyZip);
        } else {
            localStorage.removeItem('nearbyZip');
        }
    }

    render() {
        return <FilterContext.Provider value={this.state}>{this.props.children}</FilterContext.Provider>
    }
}
