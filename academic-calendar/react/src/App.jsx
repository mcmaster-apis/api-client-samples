import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { PageLayout } from './components/PageLayout'
const ProgramExplorator = React.lazy(() => import('./components/ProgramExplorator'))

const Pages = () => {
  return (
    <Routes>
      <Route path='/' element={<ProgramExplorator />} />
    </Routes>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <PageLayout>
        <Pages />
      </PageLayout>
    </BrowserRouter>
  )
}

export default App
