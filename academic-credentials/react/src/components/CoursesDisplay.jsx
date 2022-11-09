import { React } from 'react';

import  { Container, Row, Col, Card, Accordion, ListGroup } from 'react-bootstrap';

import { PropTypes } from 'prop-types';

export const CourseEnrolmentsData = (props) => {
  const items = Object.entries(props.enrolments).map((entry, index) => {
    return (<ListGroup.Item key={index}>
      {entry[1].subject} {entry[1].catalogNumber}: &quot;{entry[1].title}&quot;
    </ListGroup.Item>);    
  });
  
  return (
    <ListGroup>
      {items}
    </ListGroup>
  );
};
CourseEnrolmentsData.propTypes = {
  enrolments: PropTypes.any.isRequired
};

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
      </Card>);
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
};
CoursesData.propTypes = {
  student: PropTypes.any.isRequired
};
