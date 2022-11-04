// Override this file in your deployment environment to change remote resource endpoint behaviour
window._env = {
  calendarApi: {
    endpoint: "https://uts-api-mangement-dev-enviro.azure-api.net/calendar/v2",
    revision: "latest", // Unless otherwise documented, your choices are "latest" or "stable" (the default)
    key: "" // You will need a product subscription to obtain an API key
  }
}
