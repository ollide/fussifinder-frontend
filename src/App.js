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
        <Main region={this.context.region} zip={this.context.zip} />
        <Footer />
      </>
    );
  }
}

App.contextType = FilterContext;

export default App;
