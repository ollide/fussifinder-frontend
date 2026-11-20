import React from 'react';

import './LoadingIndicator.css';

const LoadingIndicator = () => {
    return (
        <div className="lds-wrapper" role="status" aria-label="Wird geladen">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    )
};

export default LoadingIndicator;
