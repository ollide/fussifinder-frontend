import React, { useState } from 'react';

import './Footer.scss';

const Footer = () => {

    const lsKey = 'fih-color-mode';
    const modes = ['Auto', 'Dark', 'Light'];

    const getNextMode = (mode) => {
        return modes[(modes.indexOf(mode) + 1) % modes.length];
    }

    const applyMode = (mode) => {
        const domMode = mode.toLowerCase();
        document.documentElement.setAttribute('data-color-mode', domMode);
    }

    const savedMode = localStorage.getItem(lsKey) || 'Auto';
    const [mode, setMode] = useState(savedMode);
    applyMode(savedMode);

    const onSwitchMode = () => {
        const newMode = getNextMode(mode);
        setMode(newMode);
        applyMode(newMode);
        localStorage.setItem(lsKey, newMode);
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="content has-text-centered">
                    <p>
                        <strong>Fussifinder</strong> auf <a href="https://github.com/ollide/fussball-in-hamburg">GitHub</a>.
                    </p>
                    <button className="fih-button button is-small"
                        style={{ marginTop: '10px' }}
                        onClick={onSwitchMode}>
                        <span>Theme: {mode} (Switch)</span>
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
