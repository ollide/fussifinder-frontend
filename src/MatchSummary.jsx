import React, { useContext } from 'react';

import { FilterContext } from './FilterContext';

// "N Spiele in der nächsten Woche", N counting the matches the current filters show
const MatchSummary = ({ matchDays }) => {
    const { isVisible } = useContext(FilterContext);

    const matches = matchDays.flatMap(day => day.matches);
    const visible = matches.filter(m => isVisible(m.teamTypeKey, m.leagueKey)).length;
    const hidden = matches.length - visible;

    // nowrap keeps "(82 ausgeblendet)" from breaking in the middle on narrow screens
    return <>
        {visible} Spiele in der nächsten Woche
        {hidden > 0 && <>{' '}<span style={{ whiteSpace: 'nowrap' }}>({hidden} ausgeblendet)</span></>}.
    </>;
};

export default MatchSummary;
