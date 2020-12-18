import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './helpers/reportWebVitals';
// import { sendAnalytics } from './helpers/analytics';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
// reportWebVitals(sendAnalytics);
