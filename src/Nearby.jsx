import React, { Component } from 'react';
import './Main.css';
import Filter from './Filter';

import { startMatchStream } from './matchStream';

import MatchList from './MatchList';
import PageHead from './PageHead';
import ZipForm from './layout/ZipForm';
import FilterPerimeterButton from './FilterPerimeterButton';
import { FilterContext } from './FilterContext';

class Nearby extends Component {

    state = {
        firstLoad: true,
        isLoading: true,
        error: null,
        matchDays: [],
        streamProgress: null,
        streamFading: false,
        warning: null,
    }

    stopStream = null;

    componentDidMount() {
        this.getMatches();
    }

    componentDidUpdate(prevProps) {
        const { period, perimeter, nearbyZip } = this.props;
        const prevPeriod = prevProps.period;
        const prevPerimeter = prevProps.perimeter;
        const prevNearbyZip = prevProps.nearbyZip;

        // detect region change
        // (getMatches cancels a stream that is still running)
        if ((period !== prevPeriod || perimeter !== prevPerimeter
                || nearbyZip !== prevNearbyZip)) {
            this.getMatches();
        }
    }

    componentWillUnmount() {
        this.stopStream?.();
    }

    getMatches = () => {
        const { period, perimeter, nearbyZip } = this.props;
        if (!(period && perimeter && nearbyZip)) {
            // Nothing to search for: drop a stream that is still running for the previous inputs
            this.stopStream?.();
            this.stopStream = null;
            this.setState({ isLoading: false, matchDays: [], streamProgress: null, streamFading: false, error: null, warning: null });
            return;
        }

        this.stopStream?.();
        this.setState({ firstLoad: false, isLoading: true, matchDays: [], streamProgress: null, streamFading: false, error: null, warning: null });
        this.stopStream = startMatchStream('/api/nearby/stream', { zip: nearbyZip, distance: perimeter, period }, (state) => this.setState(state));
    }

    render() {
        const { firstLoad, isLoading, matchDays, error, warning, streamProgress, streamFading } = this.state;
        const { nearbyZip } = this.props;

        return (
            <main className="page">
                <PageHead title="Fußball in der Nähe" firstLoad={firstLoad} isLoading={isLoading}
                    matchDays={matchDays} streamProgress={streamProgress} streamFading={streamFading} />

                <div className="page-body">
                    <Filter matchDays={matchDays}>
                        <div className="filter-section">
                            <h2 className="section-label">Umkreis</h2>
                            <div className="segmented" role="group" aria-label="Umkreis">
                                <FilterPerimeterButton filter="5000" name="5km" />
                                <FilterPerimeterButton filter="10000" name="10km" />
                                <FilterPerimeterButton filter="20000" name="20km" />
                                <FilterPerimeterButton filter="50000" name="50km" />
                                <FilterPerimeterButton filter="75000" name="75km" />
                            </div>
                        </div>

                        <div className="filter-section">
                            <FilterContext.Consumer>
                                {context => (
                                    <ZipForm id="nearby-zip" label="Standort" zip={nearbyZip}
                                        onZipSubmit={context.setNearbyZip} />
                                )}
                            </FilterContext.Consumer>
                        </div>
                    </Filter>

                    <div className="page-results">
                        {!firstLoad && <MatchList matchDays={matchDays} isLoading={isLoading} error={error} warning={warning}
                            onRetry={this.getMatches} />}
                    </div>
                </div>
            </main>
        );
    }
}

export default Nearby;
