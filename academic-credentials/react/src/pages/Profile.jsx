import { useEffect, useState } from 'react'

import { MsalAuthenticationTemplate, useMsal, useAccount } from '@azure/msal-react'
import { InteractionRequiredAuthError, InteractionType } from '@azure/msal-browser'

import { loginRequest, protectedResources } from '../authConfig'
import callApiWithToken from '../fetch'
import { ProfileData } from '../components/ProfileDisplay'

const ProfileContent = () => {
  const { instance, accounts, inProgress } = useMsal()
  const account = useAccount(accounts[0] || {})
  const [graphData, setGraphData] = useState(null)

  useEffect(() => {
    if (account && inProgress === 'none' && !graphData) {
      instance.acquireTokenSilent({
        scopes: protectedResources.graphMe.scopes,
        account
      }).then((response) => {
        callApiWithToken(response.accessToken, protectedResources.graphMe.endpoint)
          .then(response => setGraphData(response))
      }).catch((error) => {
        if (error instanceof InteractionRequiredAuthError) {
          if (account && inProgress === 'none') {
            instance.acquireTokenPopup({
              scopes: protectedResources.graphMe.scopes
            }).then((response) => {
              callApiWithToken(response.accessToken, protectedResources.graphMe.endpoint)
                .then(response => setGraphData(response))
            }).catch(error => console.log(error))
          }
        }
      })
    }
  }, [account, inProgress, instance])

  return (
    <>
      { graphData ? <ProfileData graphData={graphData} /> : null }
    </>
  )
}

const Profile = () => {
  const authRequest = {
    ...loginRequest
  }

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
    >
      <ProfileContent />
    </MsalAuthenticationTemplate>
  )
}

export default Profile
