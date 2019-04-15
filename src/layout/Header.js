import React from 'react';

import Menu from './Menu';

import { preventFocus } from '../util';

import iconwebp from './icon.webp';
import icon from './icon.png'
import './Header.scss';

class Header extends React.Component {

    state = {
        activeBurger: false,
    }

    toggleBurger = () => {
        this.setState((state) => ({ activeBurger: !state.activeBurger }));
    }

    render() {
        return (
            <header>
                <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item is-family-code has-text-weight-semibold" href="/">
                            <picture>
                                <source type="image/webp" srcSet={iconwebp} />
                                <img src={icon} alt="Stadion" />
                            </picture>
                            Fussifinder
                        </a>

                        <button
                            className={"navbar-burger burger " + (this.state.activeBurger && 'is-active')}
                            aria-label="menu" aria-expanded="false"
                            onClick={this.toggleBurger}
                            onMouseDown={preventFocus}
                        >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>

                    <div className={"navbar-menu " + (this.state.activeBurger && 'is-active')}>
                        <div className="navbar-end">
                            <Menu toggleBurger={this.toggleBurger} />
                        </div>
                    </div>
                </nav>
            </header >)
    }
}

export default Header;
