import React from 'react';

import './DateFilter.scss'
import { FilterContext } from './FilterContext';

class DateFilter extends React.Component {

    constructor(props) {
        super(props)
        this.dateFormat = new Intl.DateTimeFormat('default', { month: 'numeric', day: 'numeric' });
    }

    DATE = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/;

    handleDateChange = e => {
        let date = e.target.value;
        this.context.setPeriod(date);
    }

    render() {
        const active = this.DATE.test(this.context.period);
        const date = active ? this.context.period : '';
        const mobile = window.isMobile;
        return (
            <span className={'button' + (active ? ' is-active-filter' : '')}>
                <label>
                    <i className="icon-calendar"></i>
                    <input className={'date-filter' + (mobile ? ' mobile' : ' desktop')}
                        type="date"
                        value={date}
                        onChange={this.handleDateChange}
                    />

                    {mobile && date && <span className="date-text">
                        {this.dateFormat.format(new Date(date))}</span>}

                </label>
            </span>
        )
    }
}

DateFilter.contextType = FilterContext;

export default DateFilter;
