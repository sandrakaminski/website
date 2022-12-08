import React from 'react';

// import { withLDProvider } from 'launchdarkly-react-client-sdk';
import ReactDOM from 'react-dom/client';

import App from './App';

// const LDProvider = withLDProvider({ clientSideID: import.meta.env.VITE_LAUNCHDARKLY_ID })(App);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
