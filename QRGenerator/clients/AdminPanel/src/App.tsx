import { Route, Routes, useNavigate } from 'react-router-dom';
import { GlobalErrorBoundary, AlertConf, NotFoundPage } from './error';
import { AdminPage, LoginPage, MainPage } from '@src/page';
import { useAppDispatch, useAppSelector } from './store/hook';
import { RootState } from './store/store';
import { requestApi } from './store';
import { useEffect } from 'react';

function App() {

  const dispatch = useAppDispatch();
  const { process, status, loading } = useAppSelector((state: RootState) => state.info.response)
  const { adminInfo } = useAppSelector((state: RootState) => state.info.infos)
  const navigate = useNavigate()
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
  useEffect(() => {
    if (loading === false && process === 'login') {
      if (process === 'login' && status === true) {
        navigate('/');
      } else if (process === 'login' && status === false) {
        navigate('/login');
      }
    }
  }, [process, status])
  return (
    <div>
      <GlobalErrorBoundary>
        <AlertConf />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/adminOperations' element={<AdminPage />} />
          <Route path='/*' element={<NotFoundPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </GlobalErrorBoundary>

    </div>
  )
}

export default App
