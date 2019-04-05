import React from 'react';

import './LoadingIndicator.scss';

const LoadingIndicator = (props) => {
    return (
        <div className="lds-wrapper">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    )
};

export default LoadingIndicator;
