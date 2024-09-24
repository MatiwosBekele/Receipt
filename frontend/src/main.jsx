import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';
import 'react-phone-number-input/style.css';

import { Provider } from 'react-redux';
import store from './app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback='loading...'>
      <Provider store={store}>
        <App />
      </Provider>
    </React.Suspense>
  </React.StrictMode>
);
