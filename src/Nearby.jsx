import React, { Component } from 'react';
import './Main.scss';
import Filter from './Filter';

import { startMatchStream } from './matchStream';

import MatchList from './MatchList';
import MatchSummary from './MatchSummary';
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
            <>
                <section className="section">
                    <div className="container">
                        <h1 className="title">Fußball in der Nähe</h1>

                        {!firstLoad && <>
                            <p className="subtitle" style={{ marginBottom: '0.4rem' }}>
                                {isLoading ? <>Spiele werden geladen…</> :
                                    <MatchSummary matchDays={matchDays} />}
                            </p>
                            <progress
                                className={`stream-progress${!streamProgress ? ' is-hidden' : streamFading ? ' is-fading' : ''}`}
                                value={streamProgress?.current ?? 0}
                                max={streamProgress?.total ?? 1}
                            />
                        </>}
                    </div>
                </section>

                <section className="section">
                    <Filter matchDays={matchDays} />

                    <div className="container filter-container" style={{ paddingTop: '0.8rem' }}>
                        <h5 className="subtitle is-5">Umkreis</h5>
                        <div className="buttons has-addons league-filter">
                            <FilterPerimeterButton filter="5000" name="5km" />
                            <FilterPerimeterButton filter="10000" name="10km" />
                            <FilterPerimeterButton filter="20000" name="20km" />
                            <FilterPerimeterButton filter="50000" name="50km" />
                            <FilterPerimeterButton filter="75000" name="75km" />
                        </div>

                        <h5 className="subtitle is-5">Standort</h5>
                        <FilterContext.Consumer>
                            {context => (
                                <ZipForm zip={nearbyZip} onZipSubmit={context.setNearbyZip} />
                            )}
                        </FilterContext.Consumer>
                    </div>
                </section>

                {!firstLoad && <MatchList matchDays={matchDays} isLoading={isLoading} error={error} warning={warning}
                    onRetry={this.getMatches} />}
            </>
        );
    }
}

export default Nearby;
