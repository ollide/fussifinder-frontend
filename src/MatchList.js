import React from 'react';

import MatchDay from './MatchDay';
import LoadingIndicator from './LoadingIndicator';

const MatchList = props => {
    return (
        <section className="section no-mobile-padding">
            <div className="container">
                {props.error &&
                    <div className="section">
                        <div className="notification is-danger">
                            Es ist ein Fehler aufgetreten. Probier es später noch einmal.
                        </div>
                    </div>
                }

                {props.isLoading ? <>
                    <LoadingIndicator />
                    <p className="subtitle has-text-centered has-text-weight-semibold loading-indicator">
                        Spiele werden geladen…
                    </p>
                </> : <>
                        {props.matchDays.map((matchDay, index) =>
                            <MatchDay
                                key={matchDay.day}
                                index={index}
                                matchDay={matchDay}
                            />)}

                        {!props.matchDays.length &&
                            <div className="notification">
                                Keine Spiele gefunden.
                            </div>}
                    </>}
            </div>

        </section>
    );
};

export default MatchList;
