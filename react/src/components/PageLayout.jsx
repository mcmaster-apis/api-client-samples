import { React } from 'react';

import { AuthenticatedTemplate } from '@azure/msal-react';

import { NavigationBar } from './NavigationBar';

import { PropTypes } from 'prop-types';

export const PageLayout = (props) => {
  /**
   * Most applications will need to conditionally render certain components based on whether a user is signed in or not. 
   * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will 
   * only render their children if a user is authenticated or unauthenticated, respectively.
   */
  return (
    <>
      <NavigationBar />
      <br />
      <h5><center>McMaster University API Client React Sample</center></h5>
      <br />
      {props.children}
      <br />
      <AuthenticatedTemplate>
        <footer>
          <center>How did we do? 
            <a href='mailto:c-apisupport@mcmaster.ca' rel='noreferrer' target='_blank'> Share your experience!</a>
          </center>
        </footer>
      </AuthenticatedTemplate>
    </>
  );
};
PageLayout.propTypes = {
  children: PropTypes.any.isRequired
};
