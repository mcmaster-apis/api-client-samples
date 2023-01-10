// Environment-specific settings from e.g. a Kubernetes configMap.
// This is a single page application, these values will be visible
// in browser code.  Use for PUBLIC information only.

window.env = {
  azureTenantId: '7e153a68-2c14-45b5-aabd-890731981795',
  azureClientId: '',
  msalRedirectUri: 'http://localhost:3000',
  credentialsApi: {
    courses: {
      endpoint: 'https://credentials-latest.apps.ocp.mcmaster.ca/courses',
      scopes: [
        'https://mcmasteresol.onmicrosoft.com/credentials/Courses.Read'
      ]
    }
  }
}
