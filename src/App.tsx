import React, { Suspense } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import { theme } from './theme';
import Viewport from './Viewport';
import Routes from './Routes';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Viewport>
          <Suspense fallback={<p>...loading</p>}>
            <Routes />
          </Suspense>
        </Viewport>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App