import React, { Component } from 'react';
import './Main.css';
import Filter from './Filter';
import MatchList from './MatchList';
import PageHead from './PageHead';

import { startMatchStream } from './matchStream';
import { NEARBY, PERIMETERS } from './regions';

// Matches of one region (a new region remounts this component, see Routes.jsx)
class Main extends Component {

    state = {
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
        // (getMatches cancels a stream that is still running)
        if (this.props.period !== prevProps.period) {
            this.getMatches();
        }
    }

    componentWillUnmount() {
        this.stopStream?.();
    }

    getMatches = () => {
        const { region, period } = this.props;

        this.stopStream?.();
        this.setState({ isLoading: true, matchDays: [], streamProgress: null, streamFading: false, error: null, warning: null });
        const update = (state) => this.setState(state);
        this.stopStream = region.type === NEARBY
            ? startMatchStream('/api/nearby/stream', { zip: region.name, distance: region.km * 1000, period }, update)
            : startMatchStream('/api/matches/stream', { type: region.type, name: region.name, period }, update);
    }

    render() {
        const { isLoading, matchDays, error, warning, streamProgress, streamFading } = this.state;
        const { region, onRegionClick, onPerimeterChange } = this.props;
        const nearby = region.type === NEARBY;

        return (
            <main className="page">
                <PageHead region={region} onRegionClick={onRegionClick}
                    isLoading={isLoading}
                    matchDays={matchDays} streamProgress={streamProgress} streamFading={streamFading} />

                <div className={'page-body' + (error ? ' no-sidebar' : '')}>
                    {!error &&
                        <Filter matchDays={matchDays} summary={nearby ? [`${region.km} km`] : []}>
                            {nearby &&
                                <div className="filter-section">
                                    <h2 className="section-label">Umkreis</h2>
                                    <div className="segmented" role="group" aria-label="Umkreis">
                                        {PERIMETERS.map(km =>
                                            <button key={km} className={'segment' + (region.km === km ? ' is-active' : '')}
                                                aria-pressed={region.km === km}
                                                onClick={() => onPerimeterChange(km)}>
                                                {km}km
                                            </button>)}
                                    </div>
                                </div>}
                        </Filter>}

                    <div className="page-results">
                        <MatchList matchDays={matchDays} isLoading={isLoading} error={error} warning={warning}
                            onRetry={this.getMatches} />
                    </div>
                </div>
            </main>
        );
    }
}

export default Main;
