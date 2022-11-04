import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CareerFilter from './CareerFilter';
import FacultyFilter from './FacultyFilter';
import ProgramSet from './ProgramSet';

const ProgramExplorator = () => {
  const [state, setState] = useState({career: "", faculty: ""});
  
  const handleCareerChange = (career) => {
    setState(prevState => ({...prevState, career: career}));
  };
   
  const handleFacultyChange = (faculty) => {
    setState(prevState => ({...prevState, faculty: faculty}));
  };
   
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <CareerFilter career={state.career} onSelect={handleCareerChange} />
          </Col>
          <Col>
            <FacultyFilter faculty={state.faculty} onSelect={handleFacultyChange} />
          </Col>
        </Row>
        <Row>
          <ProgramSet career={state.career} faculty={state.faculty} />
        </Row>
      </Container>
    </>
  );
}

export default ProgramExplorator;