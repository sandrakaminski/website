import React, { Suspense } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter } from 'react-router-dom';

import Outline from './components/Outline';
import Routes from './Routes';
import { theme } from './theme';
import Viewport from './Viewport';

export const App: React.FC = () => {
  const stripePromise = loadStripe('pk_test_51M1Gs9K6cFrWOI6cJMPJzD2m66DcvjBBAqHldcmRWMB4EVkBJ8X7sFv5oDjAMZMs50er2AvzN9zLEC8MA5iqfyKn00UdGx6RtX');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <Viewport>
            <Suspense fallback={<Outline />}>
              <Routes />
            </Suspense>
          </Viewport>
        </Elements>
      </BrowserRouter>
    </ThemeProvider >
  )
}

export default App;

