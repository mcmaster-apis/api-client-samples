import { useState, useEffect } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import API from '../api';

const DropDownItems = (props) => {
  return Object.entries(props.faculties).map((entry, index) => {
    return (
      <Dropdown.Item key={index} eventKey={entry[1].code} active={entry[1].code === props.faculty}>{entry[1].description}</Dropdown.Item>
    );    
  });  
}

const FacultyFilter = (props) => {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    if (!faculties.length) {
      API("faculties")
        .then(resp => setFaculties(resp.data.faculties))
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <Dropdown onSelect={props.onSelect}>
      <Dropdown.Toggle id="faculty-filter">
        Select Faculty
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <DropDownItems faculties={faculties} faculty={props.faculty} />
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FacultyFilter;