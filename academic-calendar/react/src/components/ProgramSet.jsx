import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Accordion from 'react-bootstrap/Accordion'
import API from '../api'
import ProgramDetails from './ProgramDetails'

const ProgramAccordionItems = (props) => {
  if (props.programs) {
    return Object.entries(props.programs).map((entry, index) => {
      return (
        <Accordion.Item key={index} eventKey={entry[1].code}>
          <Accordion.Header>{entry[1].code}</Accordion.Header>
          <Accordion.Body>
            <ProgramDetails program={entry[1]} />
          </Accordion.Body>
        </Accordion.Item>
      )
    })
  }
}

const ProgramSet = (props) => {
  const [programs, setPrograms] = useState([])

  useEffect(() => {
    if (props.career && props.faculty) {
      API(`programs?careerCode=${props.career}&facultyCode=${props.faculty}`)
        .then(resp => setPrograms(resp.data.programs))
        .catch(err => console.error(err))
    }
  }, [props.career, props.faculty])

  return (
    <Accordion defaultActiveKey="0">
      <ProgramAccordionItems programs={programs} />
    </Accordion>
  )
}

ProgramSet.propTypes = {
  career: PropTypes.string,
  faculty: PropTypes.string
}

export default ProgramSet
