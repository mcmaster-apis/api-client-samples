import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/esm/Dropdown'

import { loginRequest } from '../authConfig'

const NavigationBar = () => {
  const { instance } = useMsal()

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
  )
}

export default NavigationBar
