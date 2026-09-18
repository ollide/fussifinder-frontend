import React from 'react';

import './FilterButton.scss'

// Badge on a switched-off filter: how many hidden matches it would show. Renders nothing for 0.
const FilterCount = ({ count }) => count > 0
    ? <span className="filter-count" title={`${count} ausgeblendete Spiele`}>{count}</span>
    : null;

export default FilterCount;
