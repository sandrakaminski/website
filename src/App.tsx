import React, { Suspense } from 'react'

import { BrowserRouter } from 'react-router-dom';

import Viewport from './Viewport'
import Routes from './Routes'

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Viewport>
        <Suspense fallback={<p>...loading</p>}>
          <Routes />
        </Suspense>
      </Viewport>
    </BrowserRouter>
  )
}

export default App