import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

const ValidateButton = (props) => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (props.chartFieldString.businessUnit &&
      props.chartFieldString.fund &&
      props.chartFieldString.account &&
      props.chartFieldString.department &&
      props.chartFieldString.program &&
      !props.validating) {
      setEnabled(true)
      return
    }

    if (props.chartFieldString.businessUnit &&
      props.chartFieldString.fund &&
      props.chartFieldString.account &&
      props.chartFieldString.department &&
      props.chartFieldString.projectBusinessUnit &&
      props.chartFieldString.project &&
      props.chartFieldString.activity &&
      props.chartFieldString.analysisType &&
      !props.validating) {
      setEnabled(true)
      return
    }
    setEnabled(false)
  }, [props.chartFieldString, props.validating])

  return (
    <div className="d-grid gap-2">
      <Button variant="primary" size="lg" disabled={!enabled} onClick={enabled ? props.handleValidateClick : null} >
        { props.validating &&
            <Spinner
              className='dropdown-spinner'
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true" />
        }
        { !props.validating && 'Validate' }
      </Button>
    </div>
  )
}

ValidateButton.propTypes = {
  chartFieldString: PropTypes.object.isRequired,
  validating: PropTypes.bool.isRequired,
  setValidating: PropTypes.func.isRequired,
  handleValidateClick: PropTypes.func.isRequired
}

export default ValidateButton
