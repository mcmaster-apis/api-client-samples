import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'

import API from '../api'

const DropDownItems = (props) => {
  return Object.entries(props.activities).map((entry, index) => {
    return (
      <Dropdown.Item key={index} eventKey={entry[1].activityCode} active={entry[1].activityCode === props.activity}><b>{entry[1].activityCode}</b> {entry[1].description}</Dropdown.Item>
    )
  })
}

const ActivitySelector = (props) => {
  const [activities, setActivities] = useState([])

  const [error, setError] = useState(null)
  if (error) {
    throw error
  }

  useEffect(() => {
    if (!activities.length && props.projectBusinessUnit && props.project) {
      API('activities', { params: { businessUnitCode: props.projectBusinessUnit, projectCode: props.project } })
        .then(resp => setActivities(resp.data.activities))
        .catch(err => setError(new Error('Cannot retrieve project activities from Chart of Accounts API: ' + err.message, err)))
    }
  }, [props.projectBusinessUnit, props.project, activities.length])

  return (
    <Stack direction='horizontal' gap={2}>
      <div style={{ width: '15px', height: '15px' }}/>
      <Dropdown onSelect={props.onSelect}>
        <Dropdown.Toggle id="activity-selector">
          Activity
        </Dropdown.Toggle>

        <Dropdown.Menu>
          { !activities.length && props.projectBusinessUnit && props.project && <Spinner
            className='dropdown-spinner'
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true" />
          }
          <DropDownItems activities={activities} activity={props.activity} />
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  )
}

ActivitySelector.propTypes = {
  activity: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  projectBusinessUnit: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default ActivitySelector
