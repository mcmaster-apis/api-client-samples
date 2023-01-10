import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropdown from 'react-bootstrap/Dropdown'
import API from '../api'

const DropDownItems = (props) => {
  return Object.entries(props.careers).map((entry, index) => {
    return (
      <Dropdown.Item key={index} eventKey={entry[1].code} active={entry[1].code === props.career}>{entry[1].description}</Dropdown.Item>
    )
  })
}

const CareerFilter = (props) => {
  const [careers, setCareers] = useState([])

  useEffect(() => {
    if (!careers.length) {
      API('careers')
        .then(resp => setCareers(resp.data.careers))
        .catch(err => console.log(err))
    }
  }, [])

  return (
    <Dropdown onSelect={props.onSelect}>
      <Dropdown.Toggle id="career-filter">
        Select Career
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <DropDownItems careers={careers} career={props.career} />
      </Dropdown.Menu>
    </Dropdown>
  )
}

CareerFilter.propTypes = {
  career: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default CareerFilter
