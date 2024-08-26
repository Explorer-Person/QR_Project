import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router basename='/adminPanel'>
        <App />
      </Router>
    </Provider>
  </StrictMode>
)
