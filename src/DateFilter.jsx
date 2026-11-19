import React from 'react';

import { FilterContext } from './FilterContext';

// Mobile devices: calendar segment at the end of the period control (tapping it opens the native date picker).
// Elsewhere: a "Bestimmter Tag:" date field below the period control.
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
        const input = <input className="date-input"
            type="date"
            value={date}
            onChange={this.handleDateChange}
        />;

        if (window.isMobile) {
            return (
                <label className={'segment date-segment' + (active ? ' is-active' : '')} aria-label="Datum wählen">
                    <i className="icon-calendar" aria-hidden="true"></i>
                    {input}
                    {date && <span>{this.dateFormat.format(new Date(date))}</span>}
                </label>
            );
        }

        return (
            <label className={'date-field' + (active ? ' is-active' : '')}>
                <i className="icon-calendar" aria-hidden="true"></i>
                <span>Bestimmter Tag:</span>
                {input}
            </label>
        )
    }
}

DateFilter.contextType = FilterContext;

export default DateFilter;
