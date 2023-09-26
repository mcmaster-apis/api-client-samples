import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MsalProvider } from '@azure/msal-react'

import { PageLayout } from './components/PageLayout'
import ErrorBoundary from './components/ErrorBoundary'

const Validator = React.lazy(() => import('./components/Validator'))

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Validator />} />
    </Routes>
  )
}

const App = ({ instance }) => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MsalProvider instance={instance}>
          <PageLayout>
            <Pages />
          </PageLayout>
        </MsalProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

App.propTypes = {
  instance: PropTypes.object.isRequired
}

export default App
