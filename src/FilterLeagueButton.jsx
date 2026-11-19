import React from 'react';

import { FilterContext } from './FilterContext';
import FilterCount from './FilterCount';
import { CheckIcon } from './icons';

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
        const active = !!this.context.league[filter];
        const mobile = this.context.isMobile;
        return (
            <button className={'chip'
                + (active ? ' is-active' : '')
                + (mobile && this.state.showTooltip ? ' tooltip' : '')
            }
                aria-pressed={active}
                aria-label={mobile ? name : undefined}
                data-tooltip={name}
                onClick={() => this.onClick(filter)}>
                {active && <CheckIcon />}
                <span>{mobile ? abbrv : name}</span>
                <FilterCount count={active ? 0 : this.props.count} />
            </button>
        )
    }
}

FilterLeagueButton.contextType = FilterContext;

export default FilterLeagueButton;
