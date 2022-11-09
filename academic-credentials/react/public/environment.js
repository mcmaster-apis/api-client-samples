// Environment-specific settings from e.g. a Kubernetes configMap.  Do NOT use for non-public information.
window.env = {
  azureTenantId: "7e153a68-2c14-45b5-aabd-890731981795",
  azureClientId: "68d1183f-7a92-40a3-8be1-d0a5d46d9087",
  msalRedirectUri: "http://localhost:3000",
  credentialsApi: {
    courses: {
      endpoint: "https://credentials-staging.apps.ocp.mcmaster.ca/courses",
      scopes: [
        "https://mcmasteresol.onmicrosoft.com/credentials/Courses.Read"
      ]
    }
  }
}
