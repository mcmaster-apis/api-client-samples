import { React } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/esm/Dropdown';

import { loginRequest } from '../authConfig';

export const NavigationBar = () => {
  const { instance } = useMsal();

  /**
   * Most applications will need to conditionally render certain components based on whether a user is signed in or not. 
   * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will 
   * only render their children if a user is authenticated or unauthenticated, respectively.
   */
  return (
    <>
      <Navbar bg='primary' variant='dark'>
        <a className='navbar-brand' href='/'>API Client Sample</a>
        <AuthenticatedTemplate>
          <Nav.Link as={Button} href='/profile'>Profile</Nav.Link>
          <Nav.Link as={Button} href='/courses'>Courses</Nav.Link>
          <Button variant='outline-secondary' onClick={() => instance.logout()} className='ml-auto'>Sign Out</Button>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <DropdownButton variant='light' className='ml-auto' drop='left' title='Sign In'>
            <Dropdown.Item as='button' onClick={() => instance.loginPopup(loginRequest)}>
              Sign in using Popup
            </Dropdown.Item>
            <Dropdown.Item as='button' onClick={() => instance.loginRedirect(loginRequest)}>
              Sign in using Redirect
            </Dropdown.Item>
          </DropdownButton>
        </UnauthenticatedTemplate>
      </Navbar>
    </>
  );
};