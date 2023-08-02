import axios from 'axios'

import { msalInstance } from './index'
import { protectedResources } from './msalConfig'

export const mapApiError = (msg, err) => {
  let content
  if (err.response.data) {
    const responseData = err.response.data
    content = `${msg}
      ID: ${responseData.id}
      Timestamp: ${responseData.timestamp}
      Detail ${responseData.messages}`
  } else {
    const timestamp = new Date().toISOString()
    content = `${msg}
      Timestamp: ${timestamp}`
  }

  return new Error(content, err)
}

const acquireAccessToken = async (msalInstance) => {
  const activeAccount = msalInstance.getActiveAccount()
  const accounts = msalInstance.getAllAccounts()

  if (!activeAccount && accounts.length === 0) {
    throw new Error('User not logged in')
    /*
    * User is not signed in. Throw error or wait for user to login.
    * Do not attempt to log a user in outside of the context of MsalProvider
    */
  }
  const request = {
    scopes: protectedResources.chartFields.scopes,
    account: activeAccount || accounts[0]
  }

  const authResult = await msalInstance.acquireTokenSilent(request)
  return authResult.accessToken
}

const axiosApiInstance = axios.create({
  baseURL: `${window._env.chartOfAccountsApi.endpoint}`,

  headers: {
    'X-McMaster-Api-Revision': `${window._env.chartOfAccountsApi.revision}`,
    'Ocp-Apim-Subscription-Key': `${window._env.chartOfAccountsApi.key}`
  }
})

axiosApiInstance.interceptors.request.use(async config => {
  const token = await acquireAccessToken(msalInstance)
  config.headers.Authorization = 'Bearer ' + token

  return config
})

export default axiosApiInstance
