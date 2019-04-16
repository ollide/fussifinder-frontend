import React from 'react';

import FilterLeagueButton from './FilterLeagueButton';
import FilterTeamButton from './FilterTeamButton';
import './Filter.scss';
import { FilterContext } from './FilterContext';

class Filter extends React.Component {

    render() {
        return (
            <FilterContext.Consumer>
                {context => (
                    <div className="container filter-container">
                        <h5 className="subtitle is-5">Alters- & Spielklassen</h5>
                        <div className="buttons has-addons team-type-filter">
                            <FilterTeamButton filter="Herren" />
                            <FilterTeamButton filter="Frauen" />
                            <FilterTeamButton filter="A-Jun" abbrv="A-Jun." name="A-JunorInnen" />
                            <FilterTeamButton filter="B-Jun" abbrv="A-Jun." name="B-JunorInnen" />
                        </div>
                        <div className="buttons has-addons league-filter">
                            <FilterLeagueButton filter="VL" name="Verbandsliga" />
                            <FilterLeagueButton filter="LL" name="Landesliga" />
                            <FilterLeagueButton filter="BL" name="Bezirksliga" />
                            <FilterLeagueButton filter="KL" name="Kreisliga" />
                            <FilterLeagueButton filter="KK" name="Kreisklasse" />
                            <FilterLeagueButton filter="FS" name="Freundschaftsspiele" />
                            <FilterLeagueButton filter="P" name="Pokal" />
                        </div>
                    </div>
                )}
            </FilterContext.Consumer>
        )
    }
}

export default Filter;
