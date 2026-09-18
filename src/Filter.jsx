import React from 'react';

import FilterLeagueButton from './FilterLeagueButton';
import FilterTeamButton from './FilterTeamButton';
import FilterPeriodButton from './FilterPeriodButton';
import DateFilter from './DateFilter';
import './Filter.scss';
import { FilterContext } from './FilterContext';

class Filter extends React.Component {

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

                    return (
                    <div className="container filter-container">
                        <h5 className="subtitle is-5">Alters- &amp; Spielklassen</h5>
                        <div className="buttons has-addons team-type-filter">
                            <FilterTeamButton filter="Herren" count={teamCount("Herren")} />
                            <FilterTeamButton filter="Frauen" count={teamCount("Frauen")} />
                            <FilterTeamButton filter="Ü32" count={teamCount("Ü32")} />
                            <FilterTeamButton filter="A-Jun" count={teamCount("A-Jun")} abbrv="U19" name="A-JunorInnen" />
                            <FilterTeamButton filter="B-Jun" count={teamCount("B-Jun")} abbrv="U17" name="B-JunorInnen" />
                        </div>
                        <div className="buttons has-addons league-filter">
                            <FilterLeagueButton filter="VL" count={leagueCount("VL")} name="Verbandsliga" />
                            <FilterLeagueButton filter="LL" count={leagueCount("LL")} name="Landesliga" />
                            <FilterLeagueButton filter="BL" count={leagueCount("BL")} name="Bezirksliga" />
                            <FilterLeagueButton filter="KL" count={leagueCount("KL")} name="Kreisliga" />
                            <FilterLeagueButton filter="KK" count={leagueCount("KK")} name="Kreisklasse" />
                            <FilterLeagueButton filter="FS" count={leagueCount("FS")} name="Freundschaftsspiele" />
                            <FilterLeagueButton filter="P" count={leagueCount("P")} name="Pokal" />
                        </div>

                        <h5 className="subtitle is-5">Zeitraum</h5>
                        <div className="buttons has-addons team-type-filter">
                            <FilterPeriodButton filter="T" name="Heute" />
                            <FilterPeriodButton filter="D3" name="3 Tage" />
                            <FilterPeriodButton filter="D7" name="7 Tage" />
                            <DateFilter />
                        </div>
                    </div>
                    );
                }}
            </FilterContext.Consumer>
        )
    }
}

export default Filter;
