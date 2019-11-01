import React, { Component } from 'react';

import Header from './layout/Header';
import Main from './Main';
import Footer from './layout/Footer';

import { FilterContext } from './FilterContext';

class App extends Component {

  render() {
    return (
      <>
        <Header />
        <Main region={this.context.region} zip={this.context.zip} period={this.context.period} />
        <Footer />
      </>
    );
  }
}

App.contextType = FilterContext;

export default App;
