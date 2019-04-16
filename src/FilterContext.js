import React from 'react';

export const FilterContext = React.createContext()

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

        this.isVisible = (teamKey, leagueKey) => {
            return this.state.league[leagueKey] && this.state.team[teamKey];
        }

        this.setRegion = (region) => {
            this.setState({ region });
        }

        this.state = {
            isMobile: this.isMobile(),
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
            toggleTeam: this.toggleTeam,
            toggleLeague: this.toggleLeague,
            isVisible: this.isVisible,
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateViewType);

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

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
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
