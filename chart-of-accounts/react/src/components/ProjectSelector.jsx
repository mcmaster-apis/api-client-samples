import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'

import API from '../api'

const DropDownItems = (props) => {
  return Object.entries(props.projects).map((entry, index) => {
    return (
      <Dropdown.Item key={index} eventKey={entry[1].projectCode} active={entry[1].projectCode === props.project}><b>{entry[1].projectCode}</b> {entry[1].description}</Dropdown.Item>
    )
  })
}

const ProjectSelector = (props) => {
  const [projects, setProjects] = useState([])
  const [error, setError] = useState(null)

  if (error) {
    throw error
  }

  useEffect(() => {
    if (!projects.length && props.projectBusinessUnit) {
      API('projects', { params: { businessUnitCode: props.projectBusinessUnit } })
        .then(resp => setProjects(resp.data.projects.sort((a, b) => a.projectCode - b.projectCode)))
        .catch(err => setError(new Error('Cannot retrieve projects from Chart of Accounts API: ' + err.message, err)))
    }
  }, [props.projectBusinessUnit, projects.length])

  return (
    <Stack direction='horizontal' gap={2}>
      <Dropdown onSelect={props.onSelect}>
        <Dropdown.Toggle id="project-selector">
          Project
        </Dropdown.Toggle>
        <Dropdown.Menu className='scrolled-dropdown'>
          { !projects.length && props.projectBusinessUnit && <Spinner
            className='dropdown-spinner'
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true" />
          }
          <DropDownItems projects={projects} project={props.project} />
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  )
}

ProjectSelector.propTypes = {
  project: PropTypes.string.isRequired,
  projectBusinessUnit: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default ProjectSelector
