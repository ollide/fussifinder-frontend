import React from 'react';

import './Match.scss'

class Match extends React.Component {

    render() {
        return (
            <div className="match columns is-multiline is-mobile is-vcentered">
                <div className="column is-11 match-header">
                    {this.props.match.date}&nbsp;
                    <span className="team-type">{this.props.match.teamType}</span>&nbsp;
                    <span className="team-league">{this.props.match.league}</span>
                </div>
                <div className="column is-1 match-header right">
                    <a href={this.props.match.url} target="_blank" rel="noopener noreferrer">
                        <i className="icon-link-ext"></i>
                    </a>
                </div>

                <div className="column is-5 home-team">
                    {this.props.match.clubHome}
                </div>
                <div className="column is-1 match-separator">:</div>
                <div className="column is-5 away-team">
                    {this.props.match.clubAway}
                </div>

                <div className="column is-1 match-details">
                    <a href={this.props.match.url} target="_blank" rel="noopener noreferrer">
                        <i className="icon-angle-down"></i>
                    </a>
                </div>
            </div>
        )
    }
}

export default Match;
