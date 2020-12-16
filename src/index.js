import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './helpers/reportWebVitals';
import { createGlobalStyle } from 'styled-components';
// import { sendAnalytics } from './helpers/analytics';

const GlobalStyle = createGlobalStyle`
 * {
   margin:0;
   padding:0;
   box-sizing:border-box;
 }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
// reportWebVitals(sendAnalytics);
