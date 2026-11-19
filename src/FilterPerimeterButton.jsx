import React from 'react';

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
            <button className={'segment' + (active ? ' is-active' : '')}
                aria-pressed={active}
                onClick={() => this.onClick(filter)}>
                {name}
            </button>
        )
    }
}

FilterPerimeterButton.contextType = FilterContext;

export default FilterPerimeterButton;
