import React, { Component } from 'react';

import Header from './layout/Header';
import AppRoutes from "./Routes";
import Footer from './layout/Footer';

import { FilterContext } from './FilterContext';

class App extends Component {

  render() {
    return (
      <>
        <Header />
        <AppRoutes />
        <Footer />
      </>
    );
  }
}

App.contextType = FilterContext;

export default App;
