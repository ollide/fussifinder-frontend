import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import './Menu.css';

import CONFIG from '../config';
import { useAppContext } from '../FilterContext';
import ZipForm from './ZipForm';
import { CheckIcon, ChevronIcon } from '../icons';
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
        if (props.open) {
            props.toggleBurger();
        }
        navigate('/');
    }

    const onNearbyClicked = () => {
        if (props.open) {
            props.toggleBurger();
        }
    }

    const toggleCategory = (category) => {
        setCategories(c => ({
            ...c,
            [category]: !c[category]
        }));
    }

    const isMobile = context.isMobile;
    const { region } = context;

    // Mobile: accordion groups. Desktop: every group is rendered, its dropdown opens on hover / focus (CSS)
    const categoryList = [{
        name: 'cities',
        type: 'CITY',
        displayName: 'Städte',
    }, {
        name: 'districts',
        type: 'DISTRICT',
        displayName: 'Landkreise',
    }, {
        name: 'specials',
        type: 'SPECIAL',
        displayName: 'Spezial',
    }, {
        name: 'associations',
        type: 'ASSOCIATION',
        displayName: 'Verbände',
        last: true,
    }].map(c => ({ ...c, visible: categories[c.name] || !isMobile }));

    // Mobile: first entry of the menu. Desktop: pill right of the dropdowns
    const nearbyLink = (
        <Link className="nav-nearby" to="/nearby" onClick={onNearbyClicked}>
            <i className="icon-location" aria-hidden="true"></i>
            <span>{isMobile ? 'Spiele in der Umgebung' : 'Umgebung'}</span>
        </Link>
    );

    return (
        <nav id="main-menu" className={'nav-menu' + (props.open ? ' is-open' : '')} aria-label="Regionen">
            {isMobile && <>{nearbyLink}<div className="nav-divider" /></>}

            {categoryList.map(c => (
                <div key={`nav-group-${c.name}`} className={'nav-group' + (c.last ? ' is-last' : '')}>
                    <button
                        className="nav-group-toggle"
                        aria-expanded={isMobile ? c.visible : undefined}
                        onMouseDown={preventFocus}
                        onClick={() => toggleCategory(c.name)}>
                        <span>{c.displayName}</span>
                        <ChevronIcon size={isMobile ? 20 : 16} className={'nav-chevron' + (isMobile && c.visible ? ' is-open' : '')} />
                    </button>
                    {c.visible &&
                        <div className="nav-dropdown">
                            {(regions[c.name] || []).map(({ name, displayName }) => {
                                const selected = region.type === c.type && region.name === name;
                                return (
                                    <button key={`${c.name}-${name}`}
                                        className={'nav-region' + (selected ? ' is-selected' : '')}
                                        aria-current={selected ? 'true' : undefined}
                                        onClick={() => setRegion(c.type, name, displayName)}
                                        onMouseDown={preventFocus}
                                    >
                                        <span>{displayName}</span>
                                        {selected && <CheckIcon size={18} strokeWidth={2.5} />}
                                    </button>
                                );
                            })}
                            {c.name === 'specials' && !isMobile &&
                                <div className="nav-zip">
                                    <ZipForm id="menu-zip" placeholder="Postleitzahl"
                                        onZipSubmit={(zip) => setRegion('ZIP', zip, zip)} />
                                </div>
                            }
                        </div>
                    }
                </div>
            ))}

            {!isMobile && nearbyLink}

            {isMobile && <div className="nav-divider" />}
            {isMobile &&
                <div className="nav-zip">
                    <ZipForm id="menu-zip" label="Nach Postleitzahl" placeholder="z. B. 20095"
                        onZipSubmit={(zip) => setRegion('ZIP', zip, zip)} />
                </div>
            }
        </nav>
    )
}

export default Menu;
