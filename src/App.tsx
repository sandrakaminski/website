import React, { Suspense } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import { BrowserRouter } from 'react-router-dom';

import Outline from '@/components/Outline';
import Routes from '@/Routes';
import { theme } from '@/theme';
import Tracker from '@/Tracker';
import Viewport from '@/Viewport';
import { CartProvider } from '@/views/Cart/cartProvider';


const LDProvider = await asyncWithLDProvider({ clientSideID: import.meta.env.VITE_LAUNCHDARKLY_ID });

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <LDProvider>
          <Tracker>
            <CartProvider>
              <Viewport>
                <Suspense fallback={<Outline />}>
                  <Routes />
                </Suspense>
              </Viewport>
            </CartProvider>
          </Tracker>
        </LDProvider>
      </BrowserRouter>
    </ThemeProvider >
  )
}
export default App;