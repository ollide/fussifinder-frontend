import React from 'react';

import './FilterButton.scss'
import { FilterContext } from './FilterContext';

class FilterPerimeterButton extends React.Component {

    onClick(filter) {
        this.context.setPerimeter(filter);
    }

    render() {
        const filter = this.props.filter;
        const active = this.context.perimeter === filter;
        const name = this.props.name;
        return (
            <span className={'button' + (active ? ' is-active-filter' : '')}
                onClick={() => this.onClick(filter)}>
                {name}
            </span>
        )
    }
}

FilterPerimeterButton.contextType = FilterContext;

export default FilterPerimeterButton;
