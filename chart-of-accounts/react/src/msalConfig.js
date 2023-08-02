import { LogLevel } from '@azure/msal-browser'

export const msalConfig = {
  auth: {
    clientId: window._env.azureClientId,
    authority: 'https://login.microsoftonline.com/' + window._env.azureRealm,
    redirectUri: window._env.msalRedirectUri,
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: 'sessionStorage', // Configures cache location. 'sessionStorage' is more secure, but 'localStorage' gives you SSO between tabs.
    storeAuthStateInCookie: false // Set this to 'true' if you are having issues on IE11 or Edge
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
            console.trace(message)
            break
        }
      }
    }
  }
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: []
}

export const protectedResources = {
  chartFields: {
    businessUnitsResource: window._env.chartOfAccountsApiUri + '/businessUnits',
    fundsResource: window._env.chartOfAccountsApiUri + '/funds',
    accountsResource: window._env.chartOfAccountsApiUri + '/accounts',
    departmentsResource: window._env.chartOfAccountsApiUri + '/departments',
    programsResource: window._env.chartOfAccountsApiUri + '/programs',
    projectBusinessUnitsResource: window._env.chartOfAccountsApiUri + '/projectBusinessUnits',
    projectsResource: window._env.chartOfAccountsApiUri + '/projects',
    activitiesResource: window._env.chartOfAccountsApiUri + '/activities',
    resourceTypesResource: window._env.chartOfAccountsApiUri + '/resourceTypes',
    analysisTypesResource: window._env.chartOfAccountsApiUri + '/analysisTypes',
    scopes: ['https://mcmaster.ca/chart-of-accounts/ChartFields.Read']
  }
}
