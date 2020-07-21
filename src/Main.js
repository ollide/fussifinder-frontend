import React, { Component } from 'react';
import './Main.scss';
import Filter from './Filter';
import MatchList from './MatchList';

import CONFIG from './config';
import { handleFetchJsonResponse } from './util';

class Main extends Component {

    state = {
        isLoading: true,
        error: null,
        matchDays: [],
    }

    componentDidMount() {
        this.getMatches();
    }

    componentDidUpdate(prevProps) {
        const { type, name } = this.props.region;
        const period = this.props.period;
        const prevRegion = prevProps.region;
        const prevPeriod = prevProps.period

        // detect region change
        if (!this.state.isLoading
            && (type !== prevRegion.type || name !== prevRegion.name
                || period !== prevPeriod)) {
            this.getMatches();
        }
    }

    getMatches = () => {
        const { type, name } = this.props.region;
        const period = this.props.period;
        this.setState({ isLoading: true });

        const url = `${CONFIG.baseApiUrl}/api/matches?`
            + `type=${type}&name=${name}&period=${period}`;

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

        let matchCount = 0;
        matchDays.forEach(({ matches }) => matchCount += matches.length);

        return (
            <>
                <section className="section">
                    <div className="container">
                        <h1 className="title">Fußball in {this.props.region.displayName}</h1>

                        <p className="subtitle">
                            {isLoading ? <>Spiele werden geladen…</> :
                                <>{matchCount} Spiele in der nächsten Woche.</>}</p>
                    </div>
                </section>

                {!error &&
                    <section className="section">
                        <Filter />
                    </section>}

                <MatchList matchDays={matchDays} isLoading={isLoading} error={error} />
            </>
        );
    }
}

export default Main;
