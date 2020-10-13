import React, { Component } from 'react';
import './Main.scss';
import Filter from './Filter';

import CONFIG from './config';
import { handleFetchJsonResponse } from './util';

import MatchList from './MatchList';
import ZipForm from './layout/ZipForm';
import FilterPerimeterButton from './FilterPerimeterButton';
import { FilterContext } from './FilterContext';

class Nearby extends Component {

    state = {
        isLoading: true,
        error: null,
        matchDays: [],
    }

    componentDidMount() {
        this.getMatches();
    }

    componentDidUpdate(prevProps) {
        const { period, perimeter, nearbyZip } = this.props;
        const prevPeriod = prevProps.period;
        const prevPerimeter = prevProps.perimeter;
        const prevNearbyZip = prevProps.nearbyZip;

        // detect region change
        if (!this.state.isLoading
            && (period !== prevPeriod || perimeter !== prevPerimeter
                || nearbyZip !== prevNearbyZip)) {
            this.getMatches();
        }
    }

    getMatches = () => {
        const { period, perimeter, nearbyZip } = this.props;
        if (!(period && perimeter && nearbyZip)) {
            this.setState({ isLoading: false });
            return;
        }
        this.setState({ isLoading: true });

        const url = `${CONFIG.baseApiUrl}/api/nearby?`
            + `zip=${nearbyZip}&distance=${perimeter}&period=${period}`;

        fetch(url, {
            method: 'get',
        })
            .then(handleFetchJsonResponse)
            .then((json) => {
                this.setState({
                    matchDays: json,
                    isLoading: false,
                });
            }).catch((err) => {
                this.setState({
                    isLoading: false,
                    error: err,
                });
            });
    }

    render() {
        const { isLoading, matchDays, error } = this.state;
        const { nearbyZip } = this.props;

        let matchCount = 0;
        matchDays.forEach(({ matches }) => matchCount += matches.length);

        return (
            <>
                <section className="section">
                    <div className="container">
                        <h1 className="title">Fußball in der Nähe</h1>

                        <p className="subtitle">
                            {isLoading ? <>Spiele werden geladen…</> :
                                <>{matchCount} Spiele in der nächsten Woche.</>}</p>
                    </div>
                </section>

                {!error &&
                    <section className="section">
                        <Filter />

                        <div className="container filter-container" style={{ paddingTop: '0.8rem' }}>
                            <h5 className="subtitle is-5">Umkreis</h5>
                            <div className="buttons has-addons league-filter">
                                <FilterPerimeterButton filter="5000" name="5km" />
                                <FilterPerimeterButton filter="10000" name="10km" />
                                <FilterPerimeterButton filter="20000" name="20km" />
                                <FilterPerimeterButton filter="50000" name="50km" />
                                <FilterPerimeterButton filter="100000" name="100km" />
                            </div>

                            <h5 className="subtitle is-5">Standort</h5>
                            <FilterContext.Consumer>
                                {context => (
                                    <ZipForm zip={nearbyZip} onZipSubmit={context.setNearbyZip} />
                                )}
                            </FilterContext.Consumer>
                        </div>
                    </section>}

                <MatchList matchDays={matchDays} isLoading={isLoading} error={error} />
            </>
        );
    }
}

export default Nearby;
