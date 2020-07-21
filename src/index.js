import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { FilterProvider } from './FilterContext';

import './index.scss';
import './iconfont.css'

import App from './App';

ReactDOM.render(
    <FilterProvider>
        <Router>
            <App />
        </Router>
    </FilterProvider>,
    document.getElementById('root')
);
