import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'

import API from '../api'

const DropDownItems = (props) => {
  return Object.entries(props.businessUnits).filter(entry => entry[1].businessUnitCode !== 'MCMST').map((entry, index) => {
    return (
      <Dropdown.Item key={index} eventKey={entry[1].businessUnitCode} active={entry[1].businessUnitCode === props.businessUnit}><b>{entry[1].businessUnitCode}</b> {entry[1].description}</Dropdown.Item>
    )
  })
}

const BusinessUnitSelector = (props) => {
  const [businessUnits, setBusinessUnits] = useState([])

  const [error, setError] = useState(null)
  if (error) {
    throw error
  }

  useEffect(() => {
    if (!businessUnits.length) {
      API('business-units')
        .then(resp => setBusinessUnits(resp.data.businessUnits))
        .catch(err => setError(new Error('Cannot retrieve business units from Chart of Accounts API: ' + err.message, err)))
    }
  }, [businessUnits.length])

  return (
    <Dropdown onSelect={props.onSelect}>
      <Dropdown.Toggle id="businessUnit-selector">
        Business Unit
      </Dropdown.Toggle>
      <Dropdown.Menu>
        { !businessUnits.length && <Spinner
          className='dropdown-spinner'
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true" />
        }
        <DropDownItems businessUnits={businessUnits} businessUnit={props.businessUnit} />
      </Dropdown.Menu>
    </Dropdown>
  )
}

BusinessUnitSelector.propTypes = {
  businessUnit: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default BusinessUnitSelector
