import { React } from 'react'
import { PropTypes } from 'prop-types'

export const PageLayout = (props) => {
  return (
    <>
      <h5><center>McMaster University General Ledger<br /> Chart Field Strings Validation</center></h5>
      <br />
      {props.children}
    </>
  )
}

PageLayout.propTypes = {
  children: PropTypes.any.isRequired
}
