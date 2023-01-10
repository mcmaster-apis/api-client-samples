import PropTypes from 'prop-types'

import { AuthenticatedTemplate } from '@azure/msal-react'

import NavigationBar from './NavigationBar'

const PageLayout = (props) => {
  return (
    <>
      <NavigationBar />
      <br />
      <h5><center>McMaster University API Client React Sample</center></h5>
      <br />
      {props.children}
      <br />
      <AuthenticatedTemplate>
        <footer>
          <center>How did we do?
            <a href='mailto:c-apisupport@mcmaster.ca' rel='noreferrer' target='_blank'> Share your experience!</a>
          </center>
        </footer>
      </AuthenticatedTemplate>
    </>
  )
}

PageLayout.propTypes = {
  children: PropTypes.any.isRequired
}

export default PageLayout
