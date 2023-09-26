import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'

import API from '../api'

const DropDownItems = (props) => {
  return Object.entries(props.analysisTypes).map((entry, index) => {
    return (
      <Dropdown.Item key={index} eventKey={entry[1].analysisTypeCode} active={entry[1].analysisTypeCode === props.analysisType}><b>{entry[1].analysisTypeCode}</b> {entry[1].description}</Dropdown.Item>
    )
  })
}

const AnalysisTypeSelector = (props) => {
  const [analysisTypes, setAnalysisTypes] = useState([])

  const [error, setError] = useState(null)
  if (error) {
    throw error
  }

  useEffect(() => {
    if (!analysisTypes.length && props.projectBusinessUnit) {
      API('analysis-types/', { params: { businessUnitCode: props.projectBusinessUnit } })
        .then(resp => setAnalysisTypes(resp.data.analysisTypes))
        .catch(err => setError(new Error('Cannot retrieve analysis types from Chart of Accounts API: ' + err.message, err)))
    }
  }, [props.projectBusinessUnit, analysisTypes.length])

  return (
    <Stack direction='horizontal' gap={2}>
      <div style={{ width: '15px', height: '15px' }}/>
      <Dropdown onSelect={props.onSelect}>
        <Dropdown.Toggle id="project-selector">
          Analysis Type
        </Dropdown.Toggle>

        <Dropdown.Menu className='scrolled-dropdown'>
          { !analysisTypes.length && props.projectBusinessUnit && <Spinner
            className='dropdown-spinner'
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true" />
          }
          <DropDownItems analysisTypes={analysisTypes} project={props.analysisType} />
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  )
}

AnalysisTypeSelector.propTypes = {
  analysisType: PropTypes.string.isRequired,
  projectBusinessUnit: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default AnalysisTypeSelector
