import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'

import API from '../api'

const DropDownItems = (props) => {
  return Object.entries(props.projectBusinessUnits).map((entry, index) => {
    return (
      <Dropdown.Item key={index} eventKey={entry[1].businessUnitCode} active={entry[1].businessUnitCode === props.projectBusinessUnit}><b>{entry[1].businessUnitCode}</b> {entry[1].description}</Dropdown.Item>
    )
  })
}

const ProjectBusinessUnitSelector = (props) => {
  const [projectBusinessUnits, setProjectBusinessUnits] = useState([])
  const [error, setError] = useState(null)

  if (error) {
    throw error
  }

  useEffect(() => {
    if (!projectBusinessUnits.length) {
      API('/project-business-units')
        .then(resp => setProjectBusinessUnits(resp.data.businessUnits))
        .catch(err => setError(new Error('Cannot retrieve project business units from Chart of Accounts API: ' + err.message, err)))
    }
  }, [projectBusinessUnits.length])

  return (
    <Stack direction='horizontal' gap={2}>
      <Dropdown onSelect={props.onSelect}>
        <Dropdown.Toggle id="projectBusinessUnit-selector">
          Project Unit
        </Dropdown.Toggle>
        <Dropdown.Menu>
          { !projectBusinessUnits.length && <Spinner
            className='dropdown-spinner'
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true" />
          }
          <DropDownItems projectBusinessUnits={projectBusinessUnits} projectBusinessUnit={props.projectBusinessUnit} />
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  )
}

ProjectBusinessUnitSelector.propTypes = {
  projectBusinessUnit: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default ProjectBusinessUnitSelector
