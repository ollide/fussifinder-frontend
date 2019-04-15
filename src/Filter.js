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
                            <FilterTeamButton name="Herren" />
                            <FilterTeamButton name="Frauen" />
                            <FilterTeamButton name="A-Jun." filter="A-Jun" />
                            <FilterTeamButton name="B-Jun." filter="B-Jun" />
                        </div>
                        <div className="buttons has-addons league-filter">
                            <FilterLeagueButton name="VL" />
                            <FilterLeagueButton name="LL" />
                            <FilterLeagueButton name="BL" />
                            <FilterLeagueButton name="KL" />
                            <FilterLeagueButton name="KK" />
                            <FilterLeagueButton name="FS" />
                            <FilterLeagueButton name="P" />
                        </div>
                    </div>
                )}
            </FilterContext.Consumer>
        )
    }
}

export default Filter;
