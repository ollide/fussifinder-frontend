import React, { useState } from 'react';

import './Footer.css';

const lsKey = 'fih-color-mode';
// stored value → button label
const modes = [['Auto', 'Auto'], ['Light', 'Hell'], ['Dark', 'Dunkel']];

const applyMode = (mode) => {
    document.documentElement.setAttribute('data-theme', mode.toLowerCase());
}

const Footer = () => {

    const savedMode = localStorage.getItem(lsKey) || 'Auto';
    const [mode, setMode] = useState(savedMode);
    applyMode(savedMode);

    const onSelectMode = (newMode) => {
        setMode(newMode);
        applyMode(newMode);
        localStorage.setItem(lsKey, newMode);
    }

    return (
        <footer className="footer">
            <p>
                <strong>Fussifinder</strong> auf <a href="https://github.com/ollide/fussball-in-hamburg">GitHub</a>
            </p>
            <div className="segmented segmented-small" role="group" aria-label="Darstellung">
                {modes.map(([value, label]) => (
                    <button key={value}
                        className={'segment' + (mode === value ? ' is-active' : '')}
                        aria-pressed={mode === value}
                        onClick={() => onSelectMode(value)}>
                        {label}
                    </button>
                ))}
            </div>
        </footer>
    )
}

export default Footer;
