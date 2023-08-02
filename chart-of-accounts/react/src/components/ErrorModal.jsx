import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ErrorModal = (props) => {
  const [show, setShow] = useState(true)

  const handleClose = () => {
    setShow(false)
    window.location.reload()
  }

  const getModalContent = (error) => {
    const timestamp = new Date().toISOString()

    return (
      <>
        <Row className='error-message-row'>
          <Col md={12}><h5>{error.message}</h5></Col>
        </Row>
        <Row className='error-detail-row'>
          <Col md={3}>UI Timestamp</Col>
          <Col md={9}>{timestamp}</Col>
        </Row>
        {error.cause?.response?.data &&
          <>
            <Row className='error-detail-row align-items-left'>
              <Col md={3}>API Error ID</Col>
              <Col md={9}>{error.cause.response.data.id}</Col>
            </Row>
            <Row className='error-detail-row'>
              <Col md={3}>API Timestamp</Col>
              <Col md={9}>{error.cause.response.data.timestamp}</Col>
            </Row>
            <Row className='error-detail-row'>
              <Col md={3}>API Detail</Col>
              <Col md={9}>{error.cause.response.data.messages}</Col>
            </Row>
          </>
        }
      </>
    )
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Validator Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {getModalContent(props.error)}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

ErrorModal.propTypes = {
  error: PropTypes.object
}

export default ErrorModal
