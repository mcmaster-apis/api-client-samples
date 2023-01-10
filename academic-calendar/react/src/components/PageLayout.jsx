import PropTypes from 'prop-types'

export const PageLayout = (props) => {
  return (
    <>
      <h5><center>Academic Calendar API React SPA Sample</center></h5>
      <br />
      {props.children}
      <br />
    </>
  )
}

PageLayout.propTypes = {
  children: PropTypes.any.isRequired
}
