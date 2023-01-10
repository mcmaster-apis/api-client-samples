import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { MsalProvider } from '@azure/msal-react'

import { PageLayout } from './components/PageLayout'
import { Profile } from './pages/Profile'
import { Courses } from './pages/Courses'

const Pages = () => {
  return (
    <Routes>
      <Route path='/profile' element={<Profile />} />
      <Route path='/courses' element={<Courses />} />
    </Routes>
  )
}

const App = (instance) => {
  return (
    <Router>
      <MsalProvider instance={instance}>
        <PageLayout>
          <Pages />
        </PageLayout>
      </MsalProvider>
    </Router>
  )
}

export default App
