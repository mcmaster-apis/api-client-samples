import React from 'react'
import { createRoot } from 'react-dom/client'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { PublicClientApplication } from '@azure/msal-browser'

import { msalConfig } from './msalConfig'
import App from './App.jsx'

import './scss/custom.scss'

export const msalInstance = new PublicClientApplication(msalConfig)
const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App instance={msalInstance} />
  </React.StrictMode>
)

serviceWorkerRegistration.register()
