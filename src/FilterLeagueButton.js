import React from 'react';

import './FilterButton.scss'
import { FilterContext } from './FilterContext';

class FilterLeagueButton extends React.Component {

    render() {
        const filter = this.props.name;
        return (
            <FilterContext.Consumer>
                {context => (
                    <span className={'button' + (context.league[filter] ? ' is-active-filter' : '')}
                        onClick={() => context.toggleLeague(filter)}>
                        {filter}
                    </span >
                )}
            </FilterContext.Consumer>
        )
    }
}

export default FilterLeagueButton;
