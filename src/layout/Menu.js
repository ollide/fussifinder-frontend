import React from 'react';

import './Menu.scss';

import CONFIG from '../config';
import { FilterContext } from '../FilterContext';
import { preventFocus, handleFetchJsonResponse } from '../util';

class Menu extends React.Component {

    state = {
        regions: {
            cities: [],
            districts: [],
            specials: [],
        }
    }

    componentDidMount() {
        fetch(`${CONFIG.baseApiUrl}/regions.json`, {
            method: 'get',
        })
            .then(handleFetchJsonResponse)
            .then((regions) => {
                this.setState({ regions });
            }).catch((err) => {
                console.error(`Err: ${err}`);
            });
    }

    setRegion = (type, name, displayName) => {
        this.context.setRegion({ type, name, displayName });
        this.props.toggleBurger();
    }

    render() {
        const { regions } = this.state;
        return (
            <>
                <div className="navbar-item has-dropdown is-hoverable">
                    <button className="navbar-link" onMouseDown={preventFocus}>
                        Städte
                    </button>
                    <div className="navbar-dropdown">
                        {regions.cities.map(({ name, displayName }) =>
                            <button key={'cities-' + name} className="navbar-item"
                                onClick={() => this.setRegion('CITY', name, displayName)}
                                onMouseDown={preventFocus}
                            >
                                {displayName}
                            </button>
                        )}
                    </div>
                </div>

                <div className="navbar-item has-dropdown is-hoverable">
                    <button className="navbar-link" onMouseDown={preventFocus}>
                        Landkreise
                    </button>
                    <div className="navbar-dropdown">
                        {regions.districts.map(({ name, displayName }) =>
                            <button key={'districts-' + name} className="navbar-item"
                                onClick={() => this.setRegion('DISTRICT', name, displayName)}
                                onMouseDown={preventFocus}
                            >
                                {displayName}
                            </button>
                        )}
                    </div>
                </div>

                <div className="navbar-item has-dropdown is-hoverable">
                    <button className="navbar-link" onMouseDown={preventFocus}>
                        Spezial
                    </button>
                    <div className="navbar-dropdown is-right">
                        {regions.specials.map(({ name, displayName }) =>
                            <button key={'special-' + name} className="navbar-item"
                                onClick={() => this.setRegion('SPECIAL', name, displayName)}
                                onMouseDown={preventFocus}
                            >
                                {displayName}
                            </button>
                        )}
                    </div>
                </div>
            </>
        )
    }
}

Menu.contextType = FilterContext;

export default Menu;
