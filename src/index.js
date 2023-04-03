import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundry from './components/shared/ErrorBoundry/ErrorBoundry';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ErrorBoundry fallback={<h1>Error Occured</h1>}>
      <App />
      <ToastContainer/>
      </ErrorBoundry>
    </React.StrictMode>
  </BrowserRouter>
);


