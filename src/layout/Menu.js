import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Menu.scss';

import CONFIG from '../config';
import { useAppContext } from '../FilterContext';
import ZipForm from './ZipForm';
import { preventFocus, handleFetchJsonResponse } from '../util';

const Menu = props => {

    const navigate = useNavigate();
    const context = useAppContext();

    const [regions, setRegions] = useState({
        cities: [],
        districts: [],
        specials: [],
        associations: [],
    });
    useEffect(() => {
        async function fetchRegions() {
            const result = await fetch(`${CONFIG.baseApiUrl}/regions.json`, {
                method: 'get',
            })
                .then(handleFetchJsonResponse)
                .catch((err) => {
                    console.error(`Err: ${err}`);
                });
            if (result) {
                setRegions(result);
            }
        }
        fetchRegions();
    }, []);

    const [categories, setCategories] = useState({
        cities: false,
        districts: false,
        specials: false,
        associations: false,
    });

    const setRegion = (type, name, displayName) => {
        context.setRegion({ type, name, displayName });
        props.toggleBurger();
        navigate('/');
    }

    const onNearbyClicked = () => {
        props.toggleBurger();
    }

    const toggleCategory = (category) => {
        setCategories(c => ({
            ...c,
            [category]: !c[category]
        }));
    }

    const getCategoryList = () => {
        const isMobile = context.isMobile;
        return [{
            name: 'cities',
            type: 'CITY',
            displayName: 'Städte',
            visible: categories.cities || !isMobile,
        }, {
            name: 'districts',
            type: 'DISTRICT',
            displayName: 'Landkreise',
            visible: categories.districts || !isMobile,
        }, {
            name: 'specials',
            type: 'SPECIAL',
            displayName: 'Spezial',
            visible: categories.specials || !isMobile,
        }, {
            name: 'associations',
            type: 'ASSOCIATION',
            displayName: 'Verbände',
            visible: categories.associations || !isMobile,
            last: true,
        }];
    }

    return (
        <>
            {getCategoryList().map(c => (
                <div
                    key={`navbar-item-${c.name}`}
                    className="navbar-item has-dropdown is-hoverable"
                >
                    <button
                        className={'navbar-link' + (c.visible && context.isMobile ? ' arrow-up' : '')}
                        onMouseDown={preventFocus}
                        onClick={() => toggleCategory(c.name)}>
                        {c.displayName}
                    </button>
                    {c.visible &&
                        <div className={'navbar-dropdown' + (c.last ? ' is-right' : '')}>
                            {(regions[c.name] || []).map(({ name, displayName }) =>
                                <button key={`${c.name}-${name}`} className="navbar-item"
                                    onClick={() => setRegion(c.type, name, displayName)}
                                    onMouseDown={preventFocus}
                                >
                                    {displayName}
                                </button>
                            )}
                            {c.name === 'specials' &&
                                <div className="navbar-item">
                                    <ZipForm onZipSubmit={(zip) => setRegion('ZIP', zip, zip)} />
                                </div>
                            }
                        </div>
                    }
                </div>
            ))}

            <Link
                className="navbar-item"
                to="/nearby"
                onClick={onNearbyClicked}
            >
                Umgebung
            </Link>
        </>
    )
}

export default Menu;
