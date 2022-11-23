import React from 'react';

import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';

import App from './App';

ReactGA.initialize(import.meta.env.VITE_GA_ID);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
