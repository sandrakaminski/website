import React, { Suspense } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom';

import { Outline } from '@/components/Outline';
import Routes from '@/Routes';
import { theme } from '@/theme';
import Tracker from '@/Tracker';
import Viewport from '@/Viewport';
import { CartProvider } from '@/views/Cart/cartProvider';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Tracker>
            <CartProvider>
              <Suspense fallback={<Outline />}>
                <Viewport>
                  <Routes />
                </Viewport>
              </Suspense>
            </CartProvider>
          </Tracker>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider >
  )
}
export default App;