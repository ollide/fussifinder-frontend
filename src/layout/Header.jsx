import React from 'react';

import Menu from './Menu';
import { MenuIcon, CloseIcon } from '../icons';

import { preventFocus } from '../util';

import iconwebp from './icon.webp';
import icon from './icon.png'
import './Header.css';

class Header extends React.Component {

    state = {
        activeBurger: false,
    }

    toggleBurger = () => {
        this.setState((state) => ({ activeBurger: !state.activeBurger }));
    }

    render() {
        const open = this.state.activeBurger;
        return (
            <>
                <header className="navbar">
                    <div className="navbar-inner">
                        <a className="navbar-brand" href="/">
                            <picture>
                                <source type="image/webp" srcSet={iconwebp} />
                                <img src={icon} alt="Stadion" width="44" height="44" />
                            </picture>
                            <span className="navbar-wordmark">Fussifinder</span>
                        </a>

                        <button
                            className="navbar-burger"
                            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
                            aria-expanded={open}
                            aria-controls="main-menu"
                            onClick={this.toggleBurger}
                            onMouseDown={preventFocus}
                        >
                            {open ? <CloseIcon /> : <MenuIcon />}
                        </button>

                        <Menu open={open} toggleBurger={this.toggleBurger} />
                    </div>
                </header>
                {open && <div className="menu-backdrop" aria-hidden="true" onClick={this.toggleBurger} />}
            </>
        )
    }
}

export default Header;
