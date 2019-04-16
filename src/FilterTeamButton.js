import React from 'react';

import './FilterButton.scss'
import { FilterContext } from './FilterContext';

class FilterTeamButton extends React.Component {

    render() {
        const filter = this.props.filter;
        const abbrv = this.props.abbrv || filter;
        const name = this.props.name || filter;
        return (
            <FilterContext.Consumer>
                {context => (
                    <span className={'button' + (context.team[filter] ? ' is-active-filter' : '')}
                        onClick={() => context.toggleTeam(filter)}>
                        {context.isMobile ? abbrv : name}
                    </span>
                )}
            </FilterContext.Consumer>
        )
    }
}

export default FilterTeamButton;
