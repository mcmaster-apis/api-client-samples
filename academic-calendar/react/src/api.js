import axios from 'axios'

export default axios.create({
  baseURL: `${window._env.calendarApi.endpoint}`,
  headers: {
    get: {
      'X-McMaster-Api-Revision': `${window._env.calendarApi.revision}`,
      'Ocp-Apim-Subscription-Key': `${window._env.calendarApi.key}`
    }
  }
})
