import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { store } from './store';
import { initEventListeners } from './services/eventListeners';
import ToastProvider from './components/ToastProvider';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';

const root = ReactDOM.createRoot(document.getElementById('root'));

initEventListeners(store.dispatch);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <ErrorBoundary>
          <React.Suspense fallback={<Loader />}>
            <App />
          </React.Suspense>
        </ErrorBoundary>
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
);
