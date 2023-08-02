import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'

import API from '../api'

const DropDownItems = (props) => {
  return Object.entries(props.programs).map((entry, index) => {
    return (
      <Dropdown.Item key={index} eventKey={entry[1].programCode} active={entry[1].programCode === props.program}><b>{entry[1].programCode}</b> {entry[1].description}</Dropdown.Item>
    )
  })
}

const ProgramSelector = (props) => {
  const [programs, setPrograms] = useState([])
  const [error, setError] = useState(null)

  if (error) {
    throw error
  }

  useEffect(() => {
    if (!programs.length && props.businessUnit) {
      API('programs/', { params: { businessUnitCode: props.businessUnit } })
        .then(resp => setPrograms(resp.data.programs.sort((a, b) => a.programCode - b.programCode)))
        .catch(err => setError(new Error('Cannot retrieve programs from Chart of Accounts API: ' + err.message, err)))
    }
  }, [props.businessUnit, programs.length])

  return (
    <Stack direction='horizontal' gap={2}>
      <Dropdown onSelect={props.onSelect}>
        <Dropdown.Toggle id="program-selector">
          Program
        </Dropdown.Toggle>
        <Dropdown.Menu className='scrolled-dropdown'>
          { !programs.length && props.businessUnit && <Spinner
            className='dropdown-spinner'
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true" />
          }
          <DropDownItems programs={programs} program={props.program} />
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  )
}

ProgramSelector.propTypes = {
  program: PropTypes.string.isRequired,
  businessUnit: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default ProgramSelector
