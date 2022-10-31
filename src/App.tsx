import React, { useState, useEffect } from 'react'
import '@/App.css'

import getKontentData from './config'

type Item = Array<Item>


export const App = () => {
  const [data, getData] = useState<Item>([])

  getKontentData({ name: 'assembly', getData })

  console.log(data?.item?.elements.name)

  return (
    <div className="App">
      my world
    </div>
  )
}

export default App
