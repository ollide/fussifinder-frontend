import React from 'react';

import './Menu.scss';

import CONFIG from '../config';
import { FilterContext } from '../FilterContext';
import ZipForm from './ZipForm';
import { preventFocus, handleFetchJsonResponse } from '../util';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.setZip = this.setZip.bind(this);
    }

    state = {
        regions: {
            cities: [],
            districts: [],
            specials: [],
        },
        categories: {
            cities: false,
            districts: false,
            specials: false,
        },
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

    setRegion(type, name, displayName) {
        this.context.setRegion({ type, name, displayName });
        this.props.toggleBurger();
    }

    setZip(zip) {
        this.context.setZip(zip);
    }

    toggleCategory(category) {
        this.setState(state => ({
            categories: {
                ...state.categories,
                [category]: !state.categories[category]
            }
        }));
    }

    render() {
        const { regions } = this.state;
        const isMobile = this.context.isMobile;
        const categories = [{
            name: 'cities',
            type: 'CITY',
            displayName: 'Städte',
            visible: this.state.categories.cities || !isMobile,
        }, {
            name: 'districts',
            type: 'DISTRICT',
            displayName: 'Landkreise',
            visible: this.state.categories.districts || !isMobile,
        }, {
            name: 'specials',
            type: 'SPECIAL',
            displayName: 'Spezial',
            last: true,
            visible: this.state.categories.specials || !isMobile,
        }];
        return (
            <>
                {categories.map(c => (
                    <div
                        key={`navbar-item-${c.name}`}
                        className="navbar-item has-dropdown is-hoverable"
                    >
                        <button
                            className={'navbar-link' + (c.visible && isMobile ? ' arrow-up' : '')}
                            onMouseDown={preventFocus}
                            onClick={() => this.toggleCategory(c.name)}>
                            {c.displayName}
                        </button>
                        {c.visible &&
                            <div className={'navbar-dropdown' + (c.last ? ' is-right' : '')}>
                                {regions[c.name].map(({ name, displayName }) =>
                                    <button key={`${c.name}-${name}`} className="navbar-item"
                                        onClick={() => this.setRegion(c.type, name, displayName)}
                                        onMouseDown={preventFocus}
                                    >
                                        {displayName}
                                    </button>
                                )}
                                {c.name === 'specials' &&
                                    <div className="navbar-item">
                                        <ZipForm zip={this.context.zip} onZipSubmit={this.setZip} />
                                    </div>
                                }
                            </div>
                        }
                    </div>
                ))}
            </>
        )
    }
}

Menu.contextType = FilterContext;

export default Menu;
