import React from 'react';
import './notFound.css';

const ErrorPage: React.FC = () => {
  return (
    <div className="error-page-container">
      <div className="error-content">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Page Not Found</h2>
        <p className="error-message">
          Do you sure that you have the correct URL?
        </p>
        <a href="/" className="home-button">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
