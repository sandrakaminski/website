import React, { Suspense } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import { theme } from './theme';
import Viewport from './Viewport';
import Routes from './Routes';
import Outline from '@/components/Outline';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Viewport>
          <Suspense fallback={<Outline />}>
            <Routes />
          </Suspense>
        </Viewport>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App; 
