import React from 'react';
import ReactDOM from 'react-dom';

import { FilterProvider } from './FilterContext';

import './index.scss';
import './iconfont.css'

import App from './App';

ReactDOM.render(<FilterProvider><App /></FilterProvider>, document.getElementById('root'));
