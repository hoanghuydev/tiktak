import React from 'react';
import '@fontsource/open-sans';
import '@fontsource/geist-mono';
import '@fontsource/playfair-display';
import '@fontsource/kanit';
import '@fontsource/dancing-script';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'normalize.css';
import 'react-circular-progressbar/dist/styles.css';
import './index.css';
import './global.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
