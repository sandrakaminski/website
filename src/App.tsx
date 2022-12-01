import React from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import Routes from '@/Routes';
import { theme } from '@/theme';
import Tracker from '@/Tracker';
import Viewport from '@/Viewport';
import { CartProvider } from '@/views/Cart/cartProvider';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Tracker>
          <CartProvider>
            <Viewport>
                <Routes />  
            </Viewport>
          </CartProvider>
        </Tracker>
      </BrowserRouter>
    </ThemeProvider >
  )
}
export default App;