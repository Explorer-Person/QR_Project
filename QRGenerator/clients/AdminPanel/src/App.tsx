import { Route, Routes } from 'react-router-dom';
import { GlobalErrorBoundary, AlertConf } from './error';
import AppPages from './routes';

function App() {

  return (
    <div>
      <GlobalErrorBoundary>
        <AlertConf />
        <Routes>
          <Route path='*' element={<AppPages/>}></Route>
        </Routes>
      </GlobalErrorBoundary>

    </div>
  )
}

export default App
