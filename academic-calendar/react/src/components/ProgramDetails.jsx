import PropTypes from 'prop-types'

import Card from 'react-bootstrap/Card'

const ProgramDetails = (props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.program.code}</Card.Title>
        <Card.Text>
          {props.program.description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

ProgramDetails.propTypes = {
  program: PropTypes.object.isRequired
}

export default ProgramDetails
