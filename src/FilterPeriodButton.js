import React from 'react';

import './FilterButton.scss'
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
            <span className={'button' + (active ? ' is-active-filter' : '')}
                onClick={() => this.onClick(filter)}>
                {name}
            </span>
        )
    }
}

FilterPeriodButton.contextType = FilterContext;

export default FilterPeriodButton;
