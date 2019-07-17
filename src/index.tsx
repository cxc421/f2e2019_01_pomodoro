import React from 'react';
import ReactDOM from 'react-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './index.css';
import { GlobalStateProvider } from './global-state';
import App from './App';

ReactDOM.render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
  document.getElementById('root')
);
