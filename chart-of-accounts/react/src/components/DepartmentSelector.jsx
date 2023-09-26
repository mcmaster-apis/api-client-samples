import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'

import API from '../api'

const DropDownItems = (props) => {
  return Object.entries(props.departments).map((entry, index) => {
    return (
      <Dropdown.Item key={index} eventKey={entry[1].departmentCode} active={entry[1].departmentCode === props.department}><b>{entry[1].departmentCode}</b> {entry[1].description}</Dropdown.Item>
    )
  })
}

const DepartmentSelector = (props) => {
  const [departments, setDepartments] = useState([])

  const [error, setError] = useState(null)
  if (error) {
    throw error
  }

  useEffect(() => {
    if (!departments.length && props.businessUnit) {
      API('departments', { params: { businessUnitCode: props.businessUnit } })
        .then(resp => setDepartments(resp.data.departments.sort((a, b) => a.departmentCode - b.departmentCode)))
        .catch(err => setError(new Error('Cannot retrieve departments from Chart of Accounts API: ' + err.message, err)))
    }
  }, [props.businessUnit, departments.length])

  return (
    <Stack direction='horizontal' gap={2}>
      <Dropdown onSelect={props.onSelect}>
        <Dropdown.Toggle id="department-selector">
          Department
        </Dropdown.Toggle>
        <Dropdown.Menu className='scrolled-dropdown'>
          { !departments.length && props.businessUnit && <Spinner
            className='dropdown-spinner'
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true" />
          }
          <DropDownItems departments={departments} department={props.department} />
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  )
}

DepartmentSelector.propTypes = {
  department: PropTypes.string.isRequired,
  businessUnit: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default DepartmentSelector
