import React from 'react';
import './notAuth.css';
import { useAppSelector } from '@src/store/hook';
import { RootState } from '@src/store/store';

const NotAuthorized: React.FC = () => {
  const { loading, status } = useAppSelector((state: RootState) => state.info.response)

  if(loading === false && status === false){
    return (
        <div className="not-authorized">
            <h1>403</h1>
            <p>Sorry, you are not authorized to view this page.</p>
            <a href="/adminPanel/login" className="back-home">
                Go Login Page
            </a>
        </div>
    );
  }
    
};

export default NotAuthorized;
