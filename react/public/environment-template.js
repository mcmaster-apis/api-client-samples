// Environment-specific settings from e.g. a Kubernetes configMap.  Do NOT use for non-public information.
window.env = {
  azureTenantId: "44376307-b429-42ad-8c25-28cd496f4772",
  azureClientId: "", // Obtained via registration with IT Security
  msalRedirectUri: "", // Specified by you during registration with IT Security
  credentialsApi: {
    courses: {
      endpoint: "https://production.apis.mcmaster.ca/credentials/courses",
      scopes: [
        "https://mcmaster.ca/credentials/Courses.Read"
      ]
    }
  }
}
