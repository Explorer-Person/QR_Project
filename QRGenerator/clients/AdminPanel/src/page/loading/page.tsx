import React from 'react';
import './style.css';

const Loading: React.FC = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading, please wait...</p>
        </div>
    );
};

export default Loading;
