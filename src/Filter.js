import React from 'react';

import FilterButton from './FilterButton';
import './Filter.scss';

class Filter extends React.Component {

    render() {
        return (
            <>
                <div className="buttons has-addons team-type-filter">
                    <FilterButton name="Herren" />
                    <FilterButton name="Frauen" />
                    <FilterButton name="A-Jun." />
                    <FilterButton name="B-Jun." />
                </div>
                <div className="buttons has-addons league-filter">
                    <FilterButton name="VL" />
                    <FilterButton name="BL" />
                    <FilterButton name="LL" />
                    <FilterButton name="KL" />
                    <FilterButton name="KK" />
                    <FilterButton name="FS" />
                </div>
            </>
        )
    }

}

export default Filter;
