import React from 'react';
import './notFound.css';

const NotFound: React.FC = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <a href="/adminPanel" className="back-home">
                Go Back Home
            </a>
        </div>
    );
};

export default NotFound;
