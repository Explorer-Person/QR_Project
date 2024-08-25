import React from 'react';
import './style.css'; // External CSS file for styling
import { FaExclamationTriangle } from 'react-icons/fa'; // Import an icon

const ErrorPage: React.FC = () => {
  return (
    <div className="error-container">
      <FaExclamationTriangle className="error-icon" />
      <h1>Oops! Something Went Wrong</h1>
      <p>We apologize for the inconvenience. Please try again later or contact support if the problem persists.</p>
      <button onClick={() => window.location.reload()} className="retry-button">
        Retry
      </button>
    </div>
  );
};

export default ErrorPage;
