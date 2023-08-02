import React from 'react'

import { useMsal } from '@azure/msal-react'
import Button from 'react-bootstrap/Button'

export const SignOutButton = () => {
  const { instance } = useMsal()

  const handleLogout = () => {
    instance.logoutPopup()
  }

  return (
    <Button className='login' onClick={() => handleLogout()} key='logoutPopup'>Logout using Popup</Button>
  )
}
