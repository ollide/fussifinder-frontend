import React from 'react';

import LoadingIndicator from './LoadingIndicator';
import './MatchDetails.scss';

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
        this.setState({ error: null });
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
        return isLoading ? <LoadingIndicator /> : (<>

            {error && <div className="column is-12 has-text-centered">
                <p>Details konnten nicht geladen werden.</p>
                <button className="button" onClick={this.loadMatchDetails}>Erneut versuchen</button>
            </div>}

            <div className="matchdetails">
                <div className="detail">
                    <i className="icon-award"></i>
                    <span>{details.competition}</span>
                </div>
                <div className="detail">
                    <i className="icon-soccer-ball"></i>
                    <span>{details.ground} ({details.pitch})</span>
                </div>
                <div className="detail">
                    <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(details.address)}
                        target="_blank" rel="noopener noreferrer"
                    >
                        <i className="icon-location"></i>
                    </a>
                    <span>{details.address}</span>
                </div>
            </div>
        </>)
    }
}

export default MatchDetails;
