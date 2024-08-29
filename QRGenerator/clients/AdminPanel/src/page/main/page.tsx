import { InputBox, UserBox } from '@src/components'
import { requestApi } from '@src/store/apis/info';
import { useAppDispatch, useAppSelector } from '@src/store/hook';
import { RootState } from '@src/store/store';
import { useEffect, useState } from 'react';
import { LoadingPage } from '../loading';
import { NotAuthPage } from '@src/error';

const MainPage = () => {
  const [dataFetched, setDataFetched] = useState(false);
  const dispatch = useAppDispatch();
  const { userInfoArray, userInfo } = useAppSelector((state: RootState) => state.info.infos)
  const { loading, status, process } = useAppSelector((state: RootState) => state.info.response)
  
  useEffect(() => {
      dispatch(requestApi({
        endpoint: `/api/authorized/user/getAll`,
        method: 'GET',
        process: 'getAll',
        data: userInfo,
        imageFile: null,
      }));    

  }, [])

  useEffect(() => {
    if (!loading) {
      setDataFetched(true);
    }
  }, [loading]);

  if (loading) {
    return <LoadingPage />
  }
  if (!dataFetched) {
    return <LoadingPage />
  }
  if(status === false && process === 'authorization'){
    return <NotAuthPage/>
  }
  return (
    
    <div>
      <div className='inputs'>
        <InputBox />
      </div>
      <div>
        {
          userInfoArray.map(userInfo => (
            <UserBox key={userInfo.id} userInfo={userInfo} />
          ))
        }
      </div>
    </div>
  )


}

export default MainPage
