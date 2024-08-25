import { MainPage } from '@src/page'
import { Route, Routes } from 'react-router-dom';
import { GlobalErrorBoundary } from './error';
function App() {

  return (
    <div>
      <GlobalErrorBoundary>
        <Routes>
          <Route path='/' element={<MainPage />} />
        </Routes>
      </GlobalErrorBoundary>

    </div>
  )
}

export default App
