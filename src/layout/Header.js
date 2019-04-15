import React from 'react';

import iconwebp from './icon.webp';
import icon from './icon.png'
import './Header.scss';

export default () => {
    return (
        <header>
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <picture>
                            <source type="image/webp" srcSet={iconwebp} />
                            <img src={icon} alt="Stadion" />
                        </picture>
                        Fußball in Hamburg
                    </a>
                </div>
            </nav>
        </header>
    )
};
