import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { NotFound } from './views/notfound'
import { Scene } from './views/scene'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Scene />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App
