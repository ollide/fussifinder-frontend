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

        this.state = {
            team: {
                Herren: true,
                Frauen: true,
                'A-Jun': true,
                'B-Jun': false,
            },
            league: {
                VL: true,
                BL: true,
                LL: true,
                KL: false,
                KK: false,
                FS: false,
            },
            toggleTeam: this.toggleTeam,
            toggleLeague: this.toggleLeague,
            isVisible: this.isVisible,
        }
    }

    render() {
        return <FilterContext.Provider value={this.state}>{this.props.children}</FilterContext.Provider>
    }
}
