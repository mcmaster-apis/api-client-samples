import Card from 'react-bootstrap/Card';

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
  );
}

export default ProgramDetails;