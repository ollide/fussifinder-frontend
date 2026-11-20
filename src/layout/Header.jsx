import React from 'react';

import StadiumMark from './StadiumMark';
import './Header.css';

// Brand line above the page title; the region is chosen from the title (RegionDialog)
const Header = () => (
    <header className="site-header">
        <a className="brand" href="/">
            <StadiumMark />
            <span className="brand-wordmark">Fussifinder</span>
        </a>
    </header>
);

export default Header;
