import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { MsalProvider } from '@azure/msal-react';

import { PageLayout } from './components/PageLayout';
import { Profile } from './pages/Profile';
import { Courses } from './pages/Courses';

import { PublicClientApplication } from '@azure/msal-browser';

const Pages = () => {
  return (
    <Switch>
      <Route path='/profile'>
        <Profile />
      </Route>
      <Route path='/courses'>
        <Courses />
      </Route>
    </Switch>
  );
};

/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be 
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication 
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the 
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const App = ({ instance: PublicClientApplication }) => {
  return (
      <Router>
      <MsalProvider instance={instance}>
        <PageLayout>
          <Pages />
        </PageLayout>
      </MsalProvider>
    </Router>
  );
};

export default App;