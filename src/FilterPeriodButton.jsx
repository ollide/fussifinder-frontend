import React from 'react';

import { FilterContext } from './FilterContext';

class FilterPeriodButton extends React.Component {

    onClick(filter) {
        this.context.setPeriod(filter);
    }

    render() {
        const filter = this.props.filter;
        const active = this.context.period === filter;
        const name = this.props.name;
        return (
            <button className={'segment' + (active ? ' is-active' : '')}
                aria-pressed={active}
                onClick={() => this.onClick(filter)}>
                {name}
            </button>
        )
    }
}

FilterPeriodButton.contextType = FilterContext;

export default FilterPeriodButton;
