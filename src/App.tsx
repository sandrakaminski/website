import React, { Suspense } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import Viewport from './Viewport'
import Routes from './Routes'

import { theme } from './theme';

export const App = (): JSX.Element => {
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