import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./Main";
import Nearby from "./Nearby";

import { useAppContext } from './FilterContext';

export default function Routes() {
    const { region, period, perimeter, nearbyZip } = useAppContext();
    return (
        <Switch>
            <Route exact path="/">
                <Main region={region} period={period} />
            </Route>

            <Route exact path="/nearby">
                <Nearby period={period} perimeter={perimeter} nearbyZip={nearbyZip} />
            </Route>

        </Switch>
    );
}
