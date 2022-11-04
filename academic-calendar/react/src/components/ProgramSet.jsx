import { useState, useEffect } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import API from '../api';
import ProgramDetails from './ProgramDetails';

const ProgramAccordionItems = (props) => {
  return Object.entries(props.programs).map((entry, index) => {
    return (
      <Accordion.Item key={index} eventKey={entry[1].code}>
        <Accordion.Header>{entry[1].code}</Accordion.Header>
        <Accordion.Body>
          <ProgramDetails program={entry[1]} />
        </Accordion.Body>
      </Accordion.Item>
    );    
  });  
};

const ProgramSet = (props) => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    if (props.career && props.faculty) {
      API(`programs?careerCode=${props.career}&facultyCode=${props.faculty}`)
        .then(resp => setPrograms(resp.data.programs))
        .catch(err => console.log(err));
    }
  }, [props.career, props.faculty]);

  return (
    <Accordion defaultActiveKey="0">
      <ProgramAccordionItems programs={programs} />
    </Accordion>
  );
}

export default ProgramSet;