// Environment-specific settings from e.g. a Kubernetes configMap.
// This is a single page application, these values will be visible
// in browser code.  Use for PUBLIC information only.

window.env = {
  azureTenantId: '44376307-b429-42ad-8c25-28cd496f4772',
  azureClientId: '', // Obtained via registration with IT Security
  msalRedirectUri: '', // Specified by you during registration with IT Security
  credentialsApi: {
    courses: {
      endpoint: 'https://api.mcmaster.ca/credentials/v1/courses',
      scopes: [
        'https://mcmaster.ca/credentials/Courses.Read'
      ]
    }
  }
}
