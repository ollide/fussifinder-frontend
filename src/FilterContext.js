import React from 'react';

export const FilterContext = React.createContext()

export class FilterProvider extends React.Component {
    constructor(props) {
        super(props);

        this.teamTypes = {
            'Herren': 'Herren',
            'Frauen': 'Frauen',
            'A-Junioren': 'A-Jun',
            'A-Juniorinnen': 'A-Jun',
            'B-Junioren': 'B-Jun',
            'B-Juniorinnen': 'B-Jun',
        }

        this.leagues = {
            'Bundesliga': 'BL',
            'Regionalliga': 'RL',
            'Verbandsliga': 'VL',
            'Landesliga': 'LL',
            'Bezirksliga': 'BL',
            'Kreisliga': 'KL',
            'Kreisklasse': 'KK',
            'FS': 'FS',
            'r-FS': 'FS',
            'L-FS': 'FS',
            'B-FS': 'FS',
            'K-FS': 'FS',
            'Pokal': 'P',
            'Kreispokal': 'P',
            'Bezirkspokal': 'P',
            'Verbandspokal': 'P',
            'DFB-Pokal': 'P',
        }

        this.toggleTeam = (name) => {
            const teamKey = this.teamTypes[name] || name;
            this.setState(state => ({ team: { ...state.team, [teamKey]: !state.team[teamKey] } }));
        }

        this.toggleLeague = (name) => {
            const leagueKey = this.leagues[name] || name;
            this.setState(state => ({ league: { ...state.league, [leagueKey]: !state.league[leagueKey] } }));
        }

        this.isVisible = (teamType, league) => {
            const teamKey = this.teamTypes[teamType] || teamType;
            const leagueKey = this.leagues[league] || league;
            return this.state.team[teamKey] && this.state.league[leagueKey];
        }

        this.setRegion = (region) => {
            this.setState({ region });
        }

        this.state = {
            region: {
                type: 'CITY',
                name: 'hamburg',
                displayName: 'Hamburg',
            },
            setRegion: this.setRegion,

            team: {
                Herren: true,
                Frauen: true,
                'A-Jun': true,
                'B-Jun': false,
            },
            league: {
                BL: true,
                RL: true,
                VL: true,
                LL: true,
                KL: false,
                KK: false,
                FS: false,
                P: true,
            },
            toggleTeam: this.toggleTeam,
            toggleLeague: this.toggleLeague,
            isVisible: this.isVisible,
        }
    }

    componentDidMount() {
        const region = JSON.parse(localStorage.getItem('region')) || {};
        const team = JSON.parse(localStorage.getItem('team')) || {};
        const league = JSON.parse(localStorage.getItem('league')) || {};
        this.setState((state) => (
            {
                region: {
                    ...state.region,
                    ...region,
                },
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

    componentDidUpdate() {
        const { region, team, league } = this.state;
        localStorage.setItem('region', JSON.stringify(region));
        localStorage.setItem('team', JSON.stringify(team));
        localStorage.setItem('league', JSON.stringify(league));
    }

    render() {
        return <FilterContext.Provider value={this.state}>{this.props.children}</FilterContext.Provider>
    }
}
