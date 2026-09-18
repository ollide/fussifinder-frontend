import React, { Component } from 'react';
import './Main.scss';
import Filter from './Filter';
import MatchList from './MatchList';
import MatchSummary from './MatchSummary';

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
            <>
                <section className="section">
                    <div className="container">
                        <h1 className="title">Fußball in {this.props.region.displayName}</h1>

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

                {!error &&
                    <section className="section">
                        <Filter matchDays={matchDays} />
                    </section>}

                {firstLoad ?
                    <section className="section">
                        <div className="container">
                            <button className="button is-medium"
                                onClick={() => this.onFindMatchesClick()}>
                                <span className="icon">
                                    <i className="icon-search"></i>
                                </span>
                                <span>Suche starten</span>
                            </button>
                        </div>
                    </section> :
                    <MatchList matchDays={matchDays} isLoading={isLoading} error={error} warning={warning}
                        onRetry={this.getMatches} />
                }
            </>
        );
    }
}

export default Main;
