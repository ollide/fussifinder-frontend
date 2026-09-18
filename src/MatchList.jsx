import React from 'react';

import './MatchList.scss';

import MatchDay from './MatchDay';
import LoadingIndicator from './LoadingIndicator';

const MatchList = props => {
    return (
        <section className="section no-mobile-padding">
            <div className="container">
                {props.error &&
                    <>
                        <div className="notification is-danger">
                            {props.error.message}
                        </div>
                        <button className="button" onClick={props.onRetry}>
                            Erneut versuchen
                        </button>
                    </>
                }

                {props.warning &&
                    <div className="notification is-warning">
                        {props.warning}
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
                            total={props.matchDays.length}
                        />)}

                    {!props.matchDays.length && !props.error &&
                        <div className="notification">
                            Keine Spiele gefunden.
                        </div>}
                </>}
            </div>

        </section>
    );
};

export default MatchList;
