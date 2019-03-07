import React, { Component } from 'react';
import './App.scss';
import Header from './Header';
import Filter from './Filter';
import MatchDay from './MatchDay';
import Footer from './Footer';

import matchDays from './matches.json';

class App extends Component {

  render() {
    return (
      <>
        <Header />
        <section className="section">
          <div className="container">
            <h1 className="title">Fußball in Hamburg</h1>
            <p className="subtitle">10 Spiele in der nächsten Woche.</p>
          </div>
        </section>

        <section className="section">
          <Filter />
        </section>

        {matchDays.map((matchDay) => <MatchDay matchDay={matchDay} />)}

        <Footer />
      </>
    );
  }
}

export default App;
