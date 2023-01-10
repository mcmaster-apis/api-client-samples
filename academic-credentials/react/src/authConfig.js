import { LogLevel } from '@azure/msal-browser'

export const msalConfig = {
  auth: {
    clientId: window.env.azureClientId, // The ONLY mandatory field that you need to supply.
    authority: `https://login.microsoftonline.com/${window.env.azureTenantId}`, // Defaults to "https://login.microsoftonline.com/common"
    redirectUri: window.env.msalRedirectUri, // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
    postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            break
          case LogLevel.Info:
            console.info(message)
            break
          case LogLevel.Verbose:
            console.debug(message)
            break
          case LogLevel.Warning:
            console.warn(message)
            break
          default:
        }
      }
    }
  }
}

export const loginRequest = {
  scopes: []
}

export const protectedResources = {
  graphMe: {
    endpoint: 'https://graph.microsoft.com/v1.0/me',
    scopes: ['User.Read']
  },
  courses: window.env.credentialsApi.courses
}
