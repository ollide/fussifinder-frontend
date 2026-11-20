import { useEffect, useState } from 'react';

import CONFIG from './config';
import { handleFetchJsonResponse } from './util';

// A region: { type, name, displayName } with type CITY | DISTRICT | SPECIAL | ASSOCIATION from regions.json,
// or { type: NEARBY, name: <zip>, km } for matches around a postal code.
export const NEARBY = 'NEARBY';

// regions.json group → region type, route segment, labels
export const GROUPS = [
    { key: 'cities', type: 'CITY', slug: 'stadt', label: 'Städte', typeLabel: 'Stadt' },
    { key: 'districts', type: 'DISTRICT', slug: 'kreis', label: 'Kreise', typeLabel: 'Landkreis' },
    { key: 'specials', type: 'SPECIAL', slug: 'spezial', label: 'Spezial', typeLabel: 'Spezial' },
    { key: 'associations', type: 'ASSOCIATION', slug: 'verband', label: 'Verbände', typeLabel: 'Verband' },
];

export const PERIMETERS = [5, 10, 20, 50, 75];
export const DEFAULT_KM = 10;

export const DEFAULT_REGION = { type: 'CITY', name: 'hamburg', displayName: 'Hamburg' };

export const ZIP = /^\d{3,5}$/;

export const groupBySlug = (slug) => GROUPS.find(g => g.slug === slug);
export const groupByType = (type) => GROUPS.find(g => g.type === type);

export const sameRegion = (a, b) => !!a && !!b && a.type === b.type && a.name === b.name;

export const regionPath = (region) => region.type === NEARBY
    ? `/umkreis/${region.name}?km=${region.km ?? DEFAULT_KM}`
    : `/${groupByType(region.type).slug}/${encodeURIComponent(region.name)}`;

export const regionLabel = (region) => region.type === NEARBY
    ? `${region.name} · ${region.km ?? DEFAULT_KM}\u00a0km`
    : region.displayName || region.name;

// Case- and accent-insensitive matching ("lune" finds "Lüneburg")
export const normalize = (text) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

// regions.json is loaded once per page load and shared by all users of useRegions()
let regionsPromise = null;

const loadRegions = () => {
    if (!regionsPromise) {
        regionsPromise = fetch(`${CONFIG.baseApiUrl}/regions.json`, { method: 'get' })
            .then(handleFetchJsonResponse)
            .catch((err) => {
                console.error(`Err: ${err}`);
                regionsPromise = null; // retry on the next use
                return null;
            });
    }
    return regionsPromise;
};

// { cities: [{ name, displayName }], districts: [...], specials: [...], associations: [...] } or null while loading
export const useRegions = () => {
    const [regions, setRegions] = useState(null);
    useEffect(() => {
        let active = true;
        loadRegions().then(result => active && result && setRegions(result));
        return () => { active = false; };
    }, []);
    return regions;
};

// displayName of a region from regions.json, null if unknown
export const findDisplayName = (regions, type, name) => {
    const group = groupByType(type);
    return regions?.[group?.key]?.find(r => r.name === name)?.displayName ?? null;
};
