import { useEffect, useState } from 'react';
import './style.css';
import { UserInfo } from '@src/interfaces';
import { FileDisplay } from './components'
import kizilayLogo from '../assets/kizilay.jpg';
import { NotFoundPage } from '@src/error';
import LoadingPage from './loadingPage';
function App() {

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const endpoint = window.location.pathname;
        const response = await fetch(`${import.meta.env.VITE_ENV_SERVER_URL}/api/public/getOne${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          setIsLoading(false); // Start loading

          throw new Error('Network response was not ok');
        }
        const handledResponse = await response.json();

        const data: UserInfo = handledResponse.data[0];
        setUserInfo(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setIsLoading(false); // Start loading
      }
    };

    fetchData();
  }, [window.location.pathname])
  const dateFormatter = (date: string) => {
    const formattedDate = date.split('T')[0].split('-').reverse().join('.');
    return formattedDate
  }
  if(isLoading){
    return <LoadingPage/>
  }
  if (userInfo === null) {
    return <NotFoundPage />
  }
  return (
    <div className="card-container">
      <div className="profile-card">
        <div className="profile-image">
          <FileDisplay mediaInfo={userInfo} />
        </div>
        <div className="profile-info">
          <h1>{`${userInfo.info.name} ${userInfo.info.surname}`}</h1>
          <div className='sideInfo'>
            <h2>{userInfo.info.role}</h2>
            <h4>Aktif Görevde</h4>
          </div>
          <div className='details'>
            <p><strong>TC Kimlik Numara:</strong> {userInfo.info.tcNumber}</p>
            <p><strong>Telefon:</strong> {userInfo.info.phone}</p>
            <p><strong>Email:</strong> {userInfo.info.email}</p>
            <p><strong>Doğum Tarihi:</strong> {dateFormatter(userInfo.info.bornDate)}</p>
          </div>
        </div>
        <div className='logo'>
          <img src={kizilayLogo} alt="kizilay" />
        </div>
      </div>
    </div>
  );
}

export default App;
