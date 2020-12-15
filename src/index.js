import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './helpers/reportWebVitals';
import './index.css';
// import { sendAnalytics } from './helpers/analytics';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
// reportWebVitals(sendAnalytics);
