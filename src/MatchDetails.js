import React from 'react';

import LoadingIndicator from './LoadingIndicator';
import './MatchDetails.scss';

class MatchDetails extends React.Component {

    state = {
        details: undefined,
    }

    componentDidMount = () => {
        const setMatchDetails = (details) => {
            this.setState({ details: details });
        }
        this.abortController = new AbortController();
        fetch(`http://localhost:3000/api/details?id=${this.props.id}`, {
            method: 'get',
            signal: this.abortController.signal,
        })
            .then((response) => response.json()).then((json) => {
                setMatchDetails(json);
            }).catch(function (err) {
                console.error(`Err: ${err}`);
                const dummy = { "address": "Slomanstraße, 20539 Hamburg", "competition": "Hansa", "ground": "Slomanstr.", "pitch": "ARTIFICIAL" };
                setMatchDetails(dummy);
            });
    }

    componentWillUnmount = () => {
        this.abortController.abort();
    }

    render() {
        return !this.state.details ? <LoadingIndicator /> : (
            <div className="matchdetails">
                <div className="detail">
                    <i className="icon-award"></i>
                    <span>{this.state.details.competition}</span>
                </div>
                <div className="detail">
                    <i className="icon-soccer-ball"></i>
                    <span>{this.state.details.ground} ({this.state.details.pitch})</span>
                </div>
                <div className="detail">
                    <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(this.state.details.address)}
                        target="_blank" rel="noopener noreferrer"
                    >
                        <i className="icon-location"></i>
                    </a>
                    <span>{this.state.details.address}</span>
                </div>
            </div>
        )
    }
}

export default MatchDetails;
