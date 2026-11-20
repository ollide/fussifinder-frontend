import React, { useContext } from 'react';

import { FilterContext } from './FilterContext';

// "N Spiele · M ausgeblendet", N counting the matches the current filters show.
// While the stream still runs (`progress` given): "N Spiele bisher · lädt… (2/3)"
const MatchSummary = ({ matchDays, progress }) => {
    const { isVisible } = useContext(FilterContext);

    const matches = matchDays.flatMap(day => day.matches);
    const visible = matches.filter(m => isVisible(m.teamTypeKey, m.leagueKey)).length;
    const hidden = matches.length - visible;
    const count = `${visible} ${visible === 1 ? 'Spiel' : 'Spiele'}`;

    // nowrap keeps the parts from breaking in the middle on narrow screens
    if (progress) {
        return <>
            {count} bisher · lädt…
            {progress.total > 0 && <>{' '}<span style={{ whiteSpace: 'nowrap' }}>({progress.current}/{progress.total})</span></>}
        </>;
    }

    return <>
        {count}
        {hidden > 0 && <>{' · '}<span style={{ whiteSpace: 'nowrap' }}>{hidden} ausgeblendet</span></>}
    </>;
};

export default MatchSummary;
