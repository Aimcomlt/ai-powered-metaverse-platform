import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { store } from './store';
import { initEventListeners } from './services/eventListeners';

const root = ReactDOM.createRoot(document.getElementById('root'));

initEventListeners(store.dispatch);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
