import { MainPage } from '@src/page';
import { GlobalErrorBoundary } from './error';

function App() {

  return (
    <div>
      <GlobalErrorBoundary>
      <MainPage/>        
      </GlobalErrorBoundary>
    </div>
  )
}

export default App
