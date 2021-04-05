import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';

export const CourseEnrolmentsData = (props) => {
  const items = Object.entries(props.enrolments).map((entry, index) => {
    return (<ListGroup.Item key={index}>
      {entry[1].subject} {entry[1].catalogNumber}: "{entry[1].title}"
    </ListGroup.Item>)    
  });
  
  return (
    <ListGroup>
      {items}
    </ListGroup>
  );
}

export const CoursesData = (props) => {
  const cards = Object.entries(props.student.terms)
    .sort((a, b) => new Date(a[1].startDate) - new Date(b[1].startDate))
    .map((entry, index) => {
    return (<Card key={index}>
      <Card.Header>
        <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
          <b>{entry[1].career}</b>: {entry[1].term}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={index + 1}>
        <Card.Body>
          <CourseEnrolmentsData enrolments={entry[1].courses} />
        </Card.Body>
      </Accordion.Collapse>
    </Card>)
  });
  
  return (
      <>
      <Container fluid>
        <Row>
          <Col>
            <Accordion>
              {cards}
           </Accordion>
          </Col>
        </Row>
      </Container>
      </>
  );
}