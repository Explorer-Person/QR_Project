import { Route, Routes, useNavigate } from 'react-router-dom';
import { NotFoundPage } from '../error';
import { AdminPage, LoginPage, MainPage } from '@src/page';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { RootState } from '../store/store';
import { requestApi } from '../store';
import { useEffect } from 'react';

function AuthPages() {
  const { process, status, loading } = useAppSelector((state: RootState) => state.info.response)
  const navigate = useNavigate();
  useEffect(() => {
    if (loading === false && process === 'login') {
      if (status === true) {
        navigate('/manage/userOperations');
      } else if (status === false) {
        navigate('/manage/login');
      }
    }
  }, [process, status])
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  )
}


function AdminPages() {

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.info.response)
  const { adminInfo } = useAppSelector((state: RootState) => state.info.infos)
  useEffect(() => {
    if (loading === false) {
      dispatch(requestApi({
        endpoint: `/api/authorize`,
        method: 'GET',
        process: 'authorization',
        data: adminInfo,
        imageFile: null,
      }));
    }
  }, []);

  return (
    <Routes>
      <Route path='/userOperations' element={<MainPage />} />
      <Route path='/adminOperations' element={<AdminPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )

}

function AppPages() {

  return (
    <Routes>
      <Route path='/*' element={<AuthPages />}/>
      <Route path='/manage/*' element={<AdminPages />}/>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppPages
