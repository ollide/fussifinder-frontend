import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';

import { FilterProvider } from './FilterContext';

import './index.css';
import './iconfont.css'

import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
    <FilterProvider>
        <Router>
            <App />
        </Router>
    </FilterProvider>
);
