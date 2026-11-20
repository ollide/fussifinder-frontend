import React from 'react';

import CONFIG from './config';
import { PinIcon, PitchIcon, TrophyIcon } from './icons';
import { handleFetchJsonResponse } from './util';

class MatchDetails extends React.Component {

    state = {
        isLoading: true,
        details: null,
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
                {isLoading ?
                    // placeholder rows with the loaded details' layout: the card doesn't jump when they arrive
                    <div className="match-details-loading" role="status" aria-label="Details werden geladen">
                        {[TrophyIcon, PitchIcon, PinIcon].map((Icon, i) =>
                            <div className="detail" key={i}>
                                <Icon />
                                <span className="detail-placeholder"></span>
                            </div>)}
                    </div> : error ?
                    <div className="match-details-error">
                        <p>Details konnten nicht geladen werden.</p>
                        <button className="btn" onClick={this.loadMatchDetails}>Erneut versuchen</button>
                    </div> : <>
                        <div className="detail">
                            <TrophyIcon />
                            <span>{details.competition}</span>
                        </div>
                        <div className="detail">
                            <PitchIcon />
                            <span>{details.ground} · {details.pitch}</span>
                        </div>
                        <a className="detail detail-link"
                            href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(details.address)}
                            target="_blank" rel="noopener noreferrer"
                        >
                            <PinIcon />
                            <span>{details.address}</span>
                        </a>
                    </>}
            </div>
        )
    }
}

export default MatchDetails;
