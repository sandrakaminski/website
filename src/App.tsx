import React, { Suspense } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter } from 'react-router-dom';

import { CartProvider } from '@/views/Cart/cartProvider';
import Outline from '@/components/Outline';
import Routes from '@/Routes';
import { theme } from '@/theme';
import Viewport from '@/Viewport';

export const App: React.FC = () => {
  const key: string = import.meta.env.VITE_STRIPE_KEY

  const stripePromise = loadStripe(key);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <CartProvider>
            <Viewport>
              <Suspense fallback={<Outline />}>
                <Routes />
              </Suspense>
            </Viewport>
          </CartProvider>
        </Elements>
      </BrowserRouter>
    </ThemeProvider >
  )
}

export default App;

