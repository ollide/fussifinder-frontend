import React, { Component } from 'react';

import Header from './layout/Header';
import Routes from "./Routes";
import Footer from './layout/Footer';

import { FilterContext } from './FilterContext';

class App extends Component {

  render() {
    return (
      <>
        <Header />
        <Routes />
        <Footer />
      </>
    );
  }
}

App.contextType = FilterContext;

export default App;
