import React from 'react';

import './FilterButton.scss'
import FilterContext from './FilterContext';

class FilterButton extends React.Component {

    state = {
        active: !!this.context[this.props.name],
        filter: this.props.name,
    }

    handleClick = () => {
        this.setState((prevState) => {
            return { active: !prevState.active }
        });
    }

    render() {
        console.log(this.context);
        const style = 'button' + (this.state.active ? ' is-active-filter' : '');
        return (
            <span className={style} onClick={this.handleClick}>
                {this.props.name}
            </span >
        )
    }
}
FilterButton.contextType = FilterContext;

export default FilterButton;
