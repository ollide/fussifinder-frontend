import React from 'react';

import MatchDay from './MatchDay';
import LoadingIndicator from './LoadingIndicator';

const MatchList = props => {
    return (
        <>
            {props.error &&
                <div className="notice-group">
                    <div className="notice notice-danger" role="alert">
                        {props.error.message}
                    </div>
                    <div>
                        <button className="btn" onClick={props.onRetry}>
                            Erneut versuchen
                        </button>
                    </div>
                </div>
            }

            {props.warning &&
                <div className="notice notice-warning" role="status">
                    {props.warning}
                </div>
            }

            {props.isLoading ? <div>
                <LoadingIndicator />
                <p className="loading-text">
                    Spiele werden geladen…
                </p>
            </div> : <>
                {props.matchDays.map((matchDay, index) =>
                    <MatchDay
                        key={matchDay.day}
                        index={index}
                        matchDay={matchDay}
                        total={props.matchDays.length}
                    />)}

                {!props.matchDays.length && !props.error &&
                    <div className="notice">
                        Keine Spiele gefunden.
                    </div>}
            </>}
        </>
    );
};

export default MatchList;
