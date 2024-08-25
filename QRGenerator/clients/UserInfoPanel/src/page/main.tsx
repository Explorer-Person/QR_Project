import { useEffect, useState } from 'react';
import './style.css';
import { UserInfo } from '@src/interfaces';
import { userData } from '@src/data';
import {FileDisplay} from './components'

function App() {

  const [userInfo, setUserInfo] = useState<UserInfo>(userData)
  
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const endpoint = window.location.pathname;
        const response = await fetch(`${import.meta.env.VITE_ENV_SERVER_URL}/api/user/getOne${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const handledResponse = await response.json();

        const data: UserInfo = handledResponse.data[0];
        setUserInfo(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [])
  const dateFormatter = (date: string) =>{
    const formattedDate = date.split('T')[0];
    return formattedDate
  }
  return (
    <div className="card-container">
      <div className="profile-card">
        <div className="profile-image">
          <FileDisplay mediaInfo={userInfo}/>
        </div>
        <div className="profile-info">
          <h1>{`${userInfo.info.name} ${userInfo.info.surname}`}</h1>
          <div className='sideInfo'>
          <h2>{userInfo.info.role}</h2> 
          <h4>Aktif Görevde</h4>
          </div>
          <div className='details'>
          <p><strong>TC Number:</strong> {userInfo.info.tcNumber}</p>
            <p><strong>Phone:</strong> {userInfo.info.phone}</p>
            <p><strong>Email:</strong> {userInfo.info.email}</p>
            <p><strong>Born Date:</strong> {dateFormatter(userInfo.info.bornDate)}</p>
          </div>
        </div>
        <div className='logo'>
            <img src="https://logowik.com/content/uploads/images/turk-kizilay-yeni6291.jpg" alt="kizilay" />
        </div>
      </div>
    </div>
  );
}

export default App;
