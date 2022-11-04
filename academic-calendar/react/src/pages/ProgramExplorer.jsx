import { useState, useEffect } from 'react';
import API from '../api';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CareerOptions = (props) => {
  return Object.entries(props.careers).map((entry, index) => {
    return (<option key={index} value={entry[1].code}>{entry[1].description}</option>);    
  });  
};

const FacultyOptions = (props) => {
  return Object.entries(props.faculties).map((entry, index) => {
    return (<option key={index} value={entry[1].code}>{entry[1].description}</option>);    
  });  
};

const ProgramOptions = (props) => {
  return Object.entries(props.programs).map((entry, index) => {
    return (<option key={index} value={entry[1].code}>{entry[1].description}</option>);    
  });  
};

const initialState = {
  "options": {
    "careers": [],
    "faculties": [],
    "programs": []
  },
  "selected" : {
    "career": "",
    "faculty": "",
    "program": ""
  }
};

export const ProgramExplorer = () => {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    (async () => {
      if (!state.options.careers.length || !state.options.faculties.length) {
        const careersResponse = await API("careers");
        const facultiesResponse = await API("faculties");
        setState(prevState => {
          return {...prevState.options, ...{"careers": careersResponse.data.careers, "faculties": facultiesResponse.data.faculties}};
        });
      }
    })();
  }, []);

  const handleCareerChange = (event) => {
    setState(prevState => {
      return {...prevState.selected, ...{"career": event.target.value}};
    });
    if (state.selected.career != "" && state.selected.faculty != "") {
      (async () => {
        const programsResponse = await API(`programs?careerCode=${state.selected.career}&facultyCode=${state.selected.faculty}`);
        setState(prevState => {
          return {...prevState.options, ...{"programs": programsResponse.data.programs}};
        });
      })();
    }
  };
  const handleFacultyChange = (event) => {
    setState(prevState => {
      return {...prevState.selected, ...{"faculty": event.target.value}};
    });
    if (state.selected.career != "" && state.selected.faculty != "") {
      (async () => {
        const programsResponse = await API(`programs?careerCode=${state.selected.career}&facultyCode=${state.selected.faculty}`);
        setState(prevState => {
          return {...prevState.options, ...{"programs": programsResponse.data.programs}};
        });
      })();
    }
  };
  const handleProgramChange = (event) => {
    setState(prevState => {
      return {...prevState.selected, ...{"program": event.target.value}};
    });
  };
  
  return (
    <>
      <Container fluid>
        <Row>
          <Form>
              { state.options.careers.length ? 
                <Col>
                  <Form.Group className="mb-3" controlId="careerSelector">
                    <Form.Label>Academic Career</Form.Label>
                    <Form.Select 
                      aria-label="Select academic career" 
                      value={state.selected.career} 
                      onChange={handleCareerChange}>
                      <CareerOptions careers={state.options.careers} />
                    </Form.Select>
                  </Form.Group>
                </Col>
                : null
              }
              { state.options.faculties.length ? 
                <Col>
                  <Form.Group className="mb-3" controlId="facultySelector">
                    <Form.Label>Academic Faculty</Form.Label>
                    <Form.Select 
                      aria-label="Select academic faculty" 
                      value={state.selected.faculty} 
                      onChange={handleFacultyChange}>
                      <FacultyOptions faculties={state.options.faculties} />
                    </Form.Select>
                  </Form.Group>
                </Col>
                : null 
              }
              { state.options.programs.length ? 
                <Col>
                  <Form.Group className="mb-3" controlId="programSelector">
                    <Form.Label>Academic Program</Form.Label>
                    <Form.Select 
                      aria-label="Select academic program" 
                      value={state.selected.program} 
                      onChange={handleProgramChange}>
                      <ProgramOptions programs={state.options.programs} />
                    </Form.Select>
                  </Form.Group>
                </Col>
                : null 
              }
          </Form>
        </Row>
      </Container>
    </>
  );
};