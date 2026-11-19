import React from 'react';

import { FilterContext } from './FilterContext';
import FilterCount from './FilterCount';
import { CheckIcon } from './icons';

class FilterTeamButton extends React.Component {

    render() {
        const filter = this.props.filter;
        const abbrv = this.props.abbrv || filter;
        const name = this.props.name || filter;
        return (
            <FilterContext.Consumer>
                {context => {
                    const active = !!context.team[filter];
                    return (
                        <button className={'chip' + (active ? ' is-active' : '')}
                            aria-pressed={active}
                            aria-label={context.isMobile && abbrv !== name ? name : undefined}
                            onClick={() => context.toggleTeam(filter)}>
                            {active && <CheckIcon />}
                            <span>{context.isMobile ? abbrv : name}</span>
                            <FilterCount count={active ? 0 : this.props.count} />
                        </button>
                    );
                }}
            </FilterContext.Consumer>
        )
    }
}

export default FilterTeamButton;
