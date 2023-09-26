import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'

import API from '../api'

const DropDownItems = (props) => {
  return Object.entries(props.funds).map((entry, index) => {
    return (
      <Dropdown.Item key={index} eventKey={entry[1].fundCode} active={entry[1].fundCode === props.fund}><b>{entry[1].fundCode}</b> {entry[1].description}</Dropdown.Item>
    )
  })
}

const FundSelector = (props) => {
  const [funds, setFunds] = useState([])
  const [error, setError] = useState(null)

  if (error) {
    throw error
  }

  useEffect(() => {
    if (!funds.length && props.businessUnit) {
      API('funds', { params: { businessUnitCode: props.businessUnit } })
        .then(resp => setFunds(resp.data.funds.sort((a, b) => a.fundCode - b.fundCode)))
        .catch(err => setError(new Error('Cannot retrieve funds from Chart of Accounts API: ' + err.message, err)))
    }
  }, [props.businessUnit, funds.length])

  return (
    <Dropdown onSelect={props.onSelect}>
      <Dropdown.Toggle id="fund-selector">
        Fund
      </Dropdown.Toggle>
      <Dropdown.Menu>
        { !funds.length && props.businessUnit && <Spinner
          className='dropdown-spinner'
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true" />
        }
        <DropDownItems funds={funds} fund={props.fund} />
      </Dropdown.Menu>
    </Dropdown>
  )
}

FundSelector.propTypes = {
  fund: PropTypes.string.isRequired,
  businessUnit: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default FundSelector
