// Environment-specific settings from e.g. a Kubernetes configMap.
// This is a single page application, these values will be visible
// in browser code.  Use for PUBLIC information only.

window._env = {
  calendarApi: {
    endpoint: "https://api.mcmaster.ca/calendar/v2",
    revision: "latest", // Unless otherwise documented, your choices are "latest" or "stable" (the default)
    key: "" // You will need a product subscription to obtain an API key
  }
}
