import React, { Component } from 'react';
import './App.scss';
import Header from './Header';
import Filter from './Filter';
import MatchDay from './MatchDay';
import Footer from './Footer';

import CONFIG from './config';
import { handleFetchJsonResponse } from './util';

import LoadingIndicator from './LoadingIndicator';

import { FilterProvider } from './FilterContext';

class App extends Component {

  state = {
    isLoading: true,
    matchDays: [],
  }

  componentDidMount = () => {
    fetch(`${CONFIG.baseApiUrl}/api/matches`, {
      method: 'get',
    })
      .then(handleFetchJsonResponse)
      .then((json) => {
        this.setState({
          matchDays: json,
          isLoading: false,
        });
      }).catch((err) => {
        console.error(`Err: ${err}`);
        this.setState({ isLoading: false });
      });
  }

  render() {
    let matchCount = 0;
    this.state.matchDays.forEach(({ matches }) => matchCount += matches.length);

    const { matchDays, isLoading } = this.state;
    return (
      <FilterProvider>
        <Header />
        <section className="section">
          <div className="container">
            <h1 className="title">Fußball in Hamburg</h1>

            <p className="subtitle">
              {isLoading ? <>Spiele werden geladen…</> :
                <>{matchCount} Spiele in der nächsten Woche.</>}</p>
          </div>
        </section>

        <section className="section">
          <Filter />
        </section>

        <section className="section no-mobile-padding">
          <div className="container">
            {isLoading ? <LoadingIndicator /> : (
              matchDays.map((matchDay, index) =>
                <MatchDay
                  key={matchDay.date}
                  index={index}
                  matchDay={matchDay}
                />)
            )}
          </div>
        </section>

        <Footer />
      </FilterProvider>
    );
  }
}

export default App;
