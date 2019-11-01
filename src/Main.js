import React, { Component } from 'react';
import './Main.scss';
import Filter from './Filter';
import MatchDay from './MatchDay';

import CONFIG from './config';
import { handleFetchJsonResponse } from './util';

import LoadingIndicator from './LoadingIndicator';

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
        const { zip, period } = this.props;
        const prevRegion = prevProps.region;
        const prevZip = prevProps.zip;
        const prevPeriod = prevProps.period

        // detect region change
        if (!this.state.isLoading
            && (type !== prevRegion.type || name !== prevRegion.name || zip !== prevZip
                || period !== prevPeriod)) {
            this.getMatches();
        }
    }

    getMatches = () => {
        const { type, name } = this.props.region;
        const { zip, period } = this.props;
        this.setState({ isLoading: true });

        const url = `${CONFIG.baseApiUrl}/api/matches?`
            + (zip ? `zip=${zip}` : `type=${type}&name=${name}`)
            + `&period=${period}`;

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

                <section className="section no-mobile-padding">
                    <div className="container">
                        {error &&
                            <div className="section">
                                <div className="notification is-danger">
                                    Es ist ein Fehler aufgetreten. Probier es später noch einmal.
                                </div>
                            </div>
                        }

                        {isLoading ? <>
                            <LoadingIndicator />
                            <p className="subtitle has-text-centered has-text-weight-semibold loading-indicator">
                                Spiele werden geladen…
                            </p>
                        </> : (
                                matchDays.map((matchDay, index) =>
                                    <MatchDay
                                        key={matchDay.day}
                                        index={index}
                                        matchDay={matchDay}
                                    />)
                            )}
                    </div>
                </section>
            </>
        );
    }
}

export default Main;
