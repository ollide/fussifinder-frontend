import React from 'react';

import './FilterButton.scss'
import { FilterContext } from './FilterContext';
import FilterCount from './FilterCount';

class FilterLeagueButton extends React.Component {

    state = {
        showTooltip: true,
    }

    onClick(filter) {
        this.setState({ showTooltip: true });
        this.context.toggleLeague(filter);

        // tooltip does not clear on mobile
        clearTimeout(this.timeOutId);
        this.timeOutId = setTimeout(() => {
            this.setState({ showTooltip: false });
        }, 1000);
    }

    componentWillUnmount = () => {
        clearTimeout(this.timeOutId);
    }

    render() {
        const filter = this.props.filter;
        const abbrv = this.props.abbrv || filter;
        const name = this.props.name;
        return (
            <button className={'button'
                + (this.context.league[filter] ? ' is-active-filter' : '')
                + (this.context.isMobile && this.state.showTooltip ? ' tooltip is-tooltip-bottom' : '')
            }
                data-tooltip={name}
                onClick={() => this.onClick(filter)}>
                {this.context.isMobile ? abbrv : name}
                <FilterCount count={this.context.league[filter] ? 0 : this.props.count} />
            </button>
        )
    }
}

FilterLeagueButton.contextType = FilterContext;

export default FilterLeagueButton;
