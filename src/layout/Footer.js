import React from 'react';

import './Footer.scss';

export default () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="content has-text-centered">
                    <p>
                        <strong>Fussifinder</strong> von <a href="https://github.com/ollide">ollide</a>.
                    </p>
                    <p>Veröffentlicht auf <a href="https://github.com/ollide/fussball-in-hamburg">GitHub</a>.</p>
                </div>
            </div>
        </footer>
    )
}
