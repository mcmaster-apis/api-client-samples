import React from 'react'

import { useMsal } from '@azure/msal-react'
import Button from 'react-bootstrap/Button'
import { loginRequest } from '../msalConfig'

export const SignInButton = () => {
  const { instance } = useMsal()

  const handleLogin = () => {
    instance.loginPopup(loginRequest)
  }

  return (
    <Button className='login' onClick={() => handleLogin()} key='loginPopup'>Sign in</Button>
  )
}
