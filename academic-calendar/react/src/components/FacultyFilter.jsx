import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropdown from 'react-bootstrap/Dropdown'
import API from '../api'

const DropDownItems = (props) => {
  return Object.entries(props.faculties).map((entry, index) => {
    return (
      <Dropdown.Item key={index} eventKey={entry[1].code} active={entry[1].code === props.faculty}>{entry[1].description}</Dropdown.Item>
    )
  })
}

const FacultyFilter = (props) => {
  const [faculties, setFaculties] = useState([])

  useEffect(() => {
    if (!faculties.length) {
      API('faculties')
        .then(resp => setFaculties(resp.data.faculties))
        .catch(err => console.error(err))
    }
  }, [])

  return (
    <Dropdown onSelect={props.onSelect}>
      <Dropdown.Toggle id="faculty-filter">
        Select Faculty
      </Dropdown.Toggle>

      <Dropdown.Menu aria-label='filter-menu'>
        <DropDownItems faculties={faculties} faculty={props.faculty} />
      </Dropdown.Menu>
    </Dropdown>
  )
}

FacultyFilter.propTypes = {
  faculty: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default FacultyFilter
