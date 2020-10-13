import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Menu.scss';

import CONFIG from '../config';
import { FilterContext } from '../FilterContext';
import ZipForm from './ZipForm';
import { preventFocus, handleFetchJsonResponse } from '../util';

class Menu extends React.Component {

    state = {
        regions: {
            cities: [],
            districts: [],
            specials: [],
            associations: [],
        },
        categories: {
            cities: false,
            districts: false,
            specials: false,
            associations: false,
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
        this.props.history.replace('/');
    }

    onNearbyClicked() {
        this.props.toggleBurger();
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
            visible: this.state.categories.specials || !isMobile,
        }, {
            name: 'associations',
            type: 'ASSOCIATION',
            displayName: 'Verbände',
            visible: this.state.categories.associations || !isMobile,
            last: true,
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
                                {(regions[c.name] || []).map(({ name, displayName }) =>
                                    <button key={`${c.name}-${name}`} className="navbar-item"
                                        onClick={() => this.setRegion(c.type, name, displayName)}
                                        onMouseDown={preventFocus}
                                    >
                                        {displayName}
                                    </button>
                                )}
                                {c.name === 'specials' &&
                                    <div className="navbar-item">
                                        <ZipForm onZipSubmit={(zip) => this.setRegion('ZIP', zip, zip)} />
                                    </div>
                                }
                            </div>
                        }
                    </div>
                ))}

                <Link
                    className="navbar-item"
                    to="/nearby"
                    onClick={(e) => this.onNearbyClicked()}
                >
                    Umgebung
                </Link>
            </>
        )
    }
}

Menu.contextType = FilterContext;

export default withRouter(Menu);
