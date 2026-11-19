import React from 'react';

import './LoadingIndicator.css';

const LoadingIndicator = ({ small = false }) => {
    return (
        <div className={'lds-wrapper' + (small ? ' is-small' : '')} role="status" aria-label="Wird geladen">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    )
};

export default LoadingIndicator;
