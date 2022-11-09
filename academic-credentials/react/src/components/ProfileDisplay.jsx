import { React } from 'react';

import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

import { PropTypes } from 'prop-types';

export const ProfileData = (props) => {
  const tableRows = Object.entries(props.graphData).map((entry, index) => {
    return (<tr key={index}>
      <td><b>{entry[0]}: </b></td>
      <td>{entry[1]}</td>
    </tr>);
  });

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Jumbotron>
              <p>Calling <strong>Microsoft Graph API</strong>...</p>
              <ul>
                <li><strong>resource:</strong> <mark>User</mark> object</li>
                <li><strong>endpoint:</strong> <mark>https://graph.microsoft.com/v1.0/me</mark></li>
                <li><strong>scope:</strong> <mark>user.read</mark></li>
              </ul>
              <p>Contents of the <strong>response</strong> is below:</p>
              <table>
                <thead>
                </thead>
                <tbody>
                  {tableRows}
                </tbody>
              </table>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </>
  );
};
ProfileData.propTypes = {
  graphData: PropTypes.any.isRequired
};
