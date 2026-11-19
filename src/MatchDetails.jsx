import React from 'react';

import LoadingIndicator from './LoadingIndicator';

import CONFIG from './config';
import { handleFetchJsonResponse } from './util';

class MatchDetails extends React.Component {

    state = {
        isLoading: true,
        details: {
            address: '-',
            competition: '-',
            ground: '-',
            pitch: '-',
        },
        error: null,
    }

    loadMatchDetails = () => {
        this.abortController = new AbortController();
        this.setState({ error: null, isLoading: true });
        fetch(`${CONFIG.baseApiUrl}/api/details?id=${this.props.id}`, {
            method: 'get',
            signal: this.abortController.signal,
        })
            .then(handleFetchJsonResponse)
            .then((json) => {
                this.setState({ details: json, isLoading: false });
            }).catch((error) => {
                console.error(`Err: ${error}`);
                this.setState({ isLoading: false, error, });
            });
    }

    componentDidMount = () => {
        this.loadMatchDetails();
    }

    componentWillUnmount = () => {
        this.abortController.abort();
    }

    render() {
        const { details, isLoading, error } = this.state;
        return (
            <div className="match-details" id={this.props.domId}>
                {isLoading ? <LoadingIndicator small /> : error ?
                    <div className="match-details-error">
                        <p>Details konnten nicht geladen werden.</p>
                        <button className="btn" onClick={this.loadMatchDetails}>Erneut versuchen</button>
                    </div> : <>
                        <div className="detail">
                            <i className="icon-award" aria-hidden="true"></i>
                            <span>{details.competition}</span>
                        </div>
                        <div className="detail">
                            <i className="icon-soccer-ball" aria-hidden="true"></i>
                            <span>{details.ground} · {details.pitch}</span>
                        </div>
                        <a className="detail detail-link"
                            href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(details.address)}
                            target="_blank" rel="noopener noreferrer"
                        >
                            <i className="icon-location" aria-hidden="true"></i>
                            <span>{details.address}</span>
                        </a>
                    </>}
            </div>
        )
    }
}

export default MatchDetails;
