import React, { Component } from 'react';
import './Main.css';
import Filter from './Filter';
import MatchList from './MatchList';
import PageHead from './PageHead';

import { startMatchStream } from './matchStream';

class Main extends Component {

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
    }

    componentDidUpdate(prevProps) {
        const { type, name } = this.props.region;
        const period = this.props.period;
        const prevRegion = prevProps.region;
        const prevPeriod = prevProps.period

        // detect region change
        // (getMatches cancels a stream that is still running)
        if (!this.state.firstLoad
            && (type !== prevRegion.type || name !== prevRegion.name
                || period !== prevPeriod)) {
            this.getMatches();
        }
    }

    componentWillUnmount() {
        this.stopStream?.();
    }

    onFindMatchesClick() {
        this.getMatches();
    }

    getMatches = () => {
        const { type, name } = this.props.region;
        const period = this.props.period;

        this.stopStream?.();
        this.setState({ firstLoad: false, isLoading: true, matchDays: [], streamProgress: null, streamFading: false, error: null, warning: null });
        this.stopStream = startMatchStream('/api/matches/stream', { type, name, period }, (state) => this.setState(state));
    }

    render() {
        const { firstLoad, isLoading, matchDays, error, warning, streamProgress, streamFading } = this.state;

        return (
            <main className="page">
                <PageHead title={`Fußball in ${this.props.region.displayName}`} firstLoad={firstLoad} isLoading={isLoading}
                    matchDays={matchDays} streamProgress={streamProgress} streamFading={streamFading} />

                <div className={'page-body' + (error ? ' no-sidebar' : '')}>
                    {!error && <Filter matchDays={matchDays} />}

                    <div className="page-results">
                        {firstLoad ?
                            <div>
                                <button className="btn btn-primary btn-start"
                                    onClick={() => this.onFindMatchesClick()}>
                                    <i className="icon-search" aria-hidden="true"></i>
                                    <span>Suche starten</span>
                                </button>
                            </div> :
                            <MatchList matchDays={matchDays} isLoading={isLoading} error={error} warning={warning}
                                onRetry={this.getMatches} />
                        }
                    </div>
                </div>
            </main>
        );
    }
}

export default Main;
