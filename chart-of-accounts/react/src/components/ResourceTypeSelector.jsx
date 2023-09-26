import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'
import API from '../api'

import Stack from 'react-bootstrap/Stack'

const DropDownItems = (props) => {
  return Object.entries(props.resourceTypes).map((entry, index) => {
    return (
      <Dropdown.Item key={index} eventKey={entry[1].resourceTypeCode} active={entry[1].resourceTypeCode === props.resourceType}><b>{entry[1].resourceTypeCode}</b> {entry[1].description}</Dropdown.Item>
    )
  })
}

const ResourceTypeSelector = (props) => {
  const [resourceTypes, setResourceTypes] = useState([])

  const [error, setError] = useState(null)
  if (error) {
    throw error
  }

  useEffect(() => {
    if (!resourceTypes.length && props.projectBusinessUnit) {
      API('resource-types/', { params: { businessUnitCode: props.projectBusinessUnit } })
        .then(resp => setResourceTypes(resp.data.resourceTypes))
        .catch(err => setError(new Error('Cannot retrieve resource types from Chart of Accounts API: ' + err.message, err)))
    }
  }, [props.projectBusinessUnit, resourceTypes.length])

  return (
    <Stack direction='horizontal' gap={2}>
      <div style={{ width: '15px', height: '15px' }}/>
      <Dropdown onSelect={props.onSelect}>
        <Dropdown.Toggle id="resource-type-selector">
          Resource Type
        </Dropdown.Toggle>

        <Dropdown.Menu>
          { !resourceTypes.length && props.projectBusinessUnit && <Spinner
            className='dropdown-spinner'
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true" />
          }
          <DropDownItems resourceTypes={resourceTypes} resourceType={props.resourceType} />
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  )
}

ResourceTypeSelector.propTypes = {
  resourceType: PropTypes.string.isRequired,
  projectBusinessUnit: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default ResourceTypeSelector
