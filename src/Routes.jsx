import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router';

import Main from "./Main";
import RegionDialog from './RegionDialog';
import { useAppContext } from './FilterContext';
import {
    DEFAULT_KM, NEARBY, PERIMETERS, ZIP, findDisplayName, groupBySlug, regionLabel, regionPath, useRegions,
} from './regions';

// '/': the most recently shown region
const Home = () => {
    const { recents } = useAppContext();
    return <Navigate to={regionPath(recents[0])} replace />;
};

// Old '/nearby' links: the most recent search around a postal code, if any
const LegacyNearby = () => {
    const { recents } = useAppContext();
    const nearby = recents.find(r => r.type === NEARBY);
    return <Navigate to={nearby ? regionPath(nearby) : '/'} replace />;
};

// Builds the region from the URL; null if the URL doesn't name one
const useRouteRegion = (nearby) => {
    const { typeSlug, name, zip } = useParams();
    const [searchParams] = useSearchParams();
    const regions = useRegions();
    const { recents } = useAppContext();

    if (nearby) {
        if (!ZIP.test(zip)) return null;
        const km = Number(searchParams.get('km'));
        return { type: NEARBY, name: zip, km: PERIMETERS.includes(km) ? km : DEFAULT_KM };
    }
    const group = groupBySlug(typeSlug);
    if (!group) return null;
    // display name: regions.json, else a recent region (regions.json still loading), else the URL's name
    const displayName = findDisplayName(regions, group.type, name)
        ?? recents.find(r => r.type === group.type && r.name === name)?.displayName
        ?? name;
    return { type: group.type, name, displayName };
};

const RegionRoute = ({ nearby = false }) => {
    const region = useRouteRegion(nearby);
    const location = useLocation();
    const navigate = useNavigate();
    const { period, addRecent, setPerimeter } = useAppContext();
    const [dialogOpen, setDialogOpen] = useState(false);

    const path = region && regionPath(region);
    const label = region && regionLabel(region);

    useEffect(() => {
        if (region) {
            addRecent(region);
            document.title = `Fußball ${region.type === NEARBY ? 'im Umkreis von' : 'in'} ${label} · Fussifinder`;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- once per region (path) and its loaded name
    }, [path, label]);

    if (!region) {
        return <Navigate to="/" replace />;
    }

    const select = (selected) => {
        setDialogOpen(false);
        navigate(regionPath(selected));
    };

    const changePerimeter = (km) => {
        setPerimeter(String(km * 1000));
        navigate(regionPath({ ...region, km }), { replace: true });
    };

    return (
        <>
            <Main key={location.key} region={region} period={period}
                onRegionClick={() => setDialogOpen(true)}
                onPerimeterChange={changePerimeter} />
            <RegionDialog open={dialogOpen} region={region} onSelect={select} onClose={() => setDialogOpen(false)} />
        </>
    );
};

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nearby" element={<LegacyNearby />} />
            <Route path="/umkreis/:zip" element={<RegionRoute nearby />} />
            <Route path="/:typeSlug/:name" element={<RegionRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
