import React from 'react'
import { createRoot } from 'react-dom/client'

import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from './authConfig'

import App from './App.jsx'

import './scss/custom.scss'

const container = document.getElementById('root')
const root = createRoot(container)
const msalInstance = new PublicClientApplication(msalConfig)

root.render(
  <React.StrictMode>
    <App instance={msalInstance} />
  </React.StrictMode>
)
