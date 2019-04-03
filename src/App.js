import React, { Component } from 'react';
import './App.scss';
import Header from './Header';
import Filter from './Filter';
import MatchDay from './MatchDay';
import Footer from './Footer';

import matchDays from './matches.json';
import { FilterProvider } from './FilterContext';

class App extends Component {

  render() {
    let matches = 0;
    matchDays.forEach(match => matches += match.matches.length);

    return (
      <FilterProvider>
        <Header />
        <section className="section">
          <div className="container">
            <h1 className="title">Fußball in Hamburg</h1>
            <p className="subtitle">{matches} Spiele in der nächsten Woche.</p>
          </div>
        </section>

        <section className="section">
          <Filter />
        </section>

        {matchDays.map((matchDay, index) =>
          <MatchDay
            key={matchDay.date}
            index={index}
            matchDay={matchDay}
          />)}

        <Footer />
      </FilterProvider>
    );
  }
}

export default App;
