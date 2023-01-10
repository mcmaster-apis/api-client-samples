import { useEffect, useState } from 'react'

import { MsalAuthenticationTemplate, useMsal, useAccount } from '@azure/msal-react'
import { InteractionRequiredAuthError, InteractionType } from '@azure/msal-browser'

import { loginRequest, protectedResources } from '../authConfig'
import callApiWithToken from '../fetch'
import { CoursesData } from '../components/CoursesDisplay'

const CoursesContent = () => {
  const { instance, accounts, inProgress } = useMsal()
  const account = useAccount(accounts[0] || {})
  const [coursesData, setCoursesData] = useState(null)

  useEffect(() => {
    if (account && inProgress === 'none' && !coursesData) {
      instance.acquireTokenSilent({
        scopes: protectedResources.courses.scopes,
        account
      }).then((response) => {
        callApiWithToken(response.accessToken, protectedResources.courses.endpoint)
          .then(response => setCoursesData(response))
      }).catch((error) => {
        // in case if silent token acquisition fails, fallback to an interactive method
        if (error instanceof InteractionRequiredAuthError) {
          if (account && inProgress === 'none') {
            instance.acquireTokenPopup({
              scopes: protectedResources.courses.scopes
            }).then((response) => {
              callApiWithToken(response.accessToken, protectedResources.courses.endpoint)
                .then(response => setCoursesData(response))
            }).catch(error => console.log(error))
          }
        }
      })
    }
  }, [account, inProgress, instance])

  return (
    <>
      { coursesData ? <CoursesData student={coursesData} /> : null }
    </>
  )
}

const Courses = () => {
  const authRequest = {
    ...loginRequest
  }

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
    >
      <CoursesContent />
    </MsalAuthenticationTemplate>
  )
}

export default Courses
