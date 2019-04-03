import React from 'react';

import './FilterButton.scss'
import { FilterContext } from './FilterContext';

class FilterTeamButton extends React.Component {

    render() {
        const name = this.props.name;
        const filter = this.props.filter || name;
        return (
            <FilterContext.Consumer>
                {context => (
                    <span className={'button' + (context.team[filter] ? ' is-active-filter' : '')}
                        onClick={() => context.toggleTeam(filter)}>
                        {name}
                    </span>
                )}
            </FilterContext.Consumer>
        )
    }
}

export default FilterTeamButton;
