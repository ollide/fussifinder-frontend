import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import Nearby from "./Nearby";

import { useAppContext } from './FilterContext';

export default function AppRoutes() {
    const { region, period, perimeter, nearbyZip } = useAppContext();
    return (
        <Routes>
            <Route
                exact
                path="/"
                element={<Main region={region} period={period} />}
            />

            <Route
                exact
                path="/nearby"
                element={<Nearby period={period} perimeter={perimeter} nearbyZip={nearbyZip} />}
            />

        </Routes>
    );
}
