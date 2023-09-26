import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { MsalAuthenticationTemplate } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'
import { loginRequest } from '../msalConfig'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'

import API from '../api'

import BusinessUnitSelector from './BusinessUnitSelector'
import FundSelector from './FundSelector'
import DepartmentSelector from './DepartmentSelector'
import ProgramSelector from './ProgramSelector'
import ProjectBusinessUnitSelector from './ProjectBusinessUnitSelector'
import ProjectSelector from './ProjectSelector'
import ActivitySelector from './ActivitySelector'
import ResourceTypeSelector from './ResourceTypeSelector'
import AnalysisTypeSelector from './AnalysisTypeSelector'
import ValidateButton from './ValidateButton'

import AccountSelector from './AccountSelector'

import ErrorModal from './ErrorModal'

const Validator = () => {
  const [error, setError] = useState(null)
  if (error) {
    throw error
  }

  const [fundsByType, setFundsByType] = useState({
    operational: [],
    project: []
  })

  const [state, setState] = useState({
    businessUnit: '',
    fund: '',
    account: '',
    department: '',
    program: '',
    projectBusinessUnit: '',
    project: '',
    activity: '',
    resourceType: '',
    analysisType: ''
  })

  const [validating, setValidating] = useState(false)

  const [validationResult, setValidationResult] = useState(null)

  useEffect(() => {
    if (!fundsByType.operational.length && state.businessUnit) {
      API('funds', { params: { businessUnitCode: state.businessUnit, type: 'operational' } })
        .then(resp => resp.data.funds.map(f => f.fundCode))
        .then(operational => setFundsByType(prevState => ({ ...prevState, operational })))
        .catch(err => setError(new Error('Cannot retrieve operational funds from Chart of Accounts API: ' + err.message, err)))
    }

    if (!fundsByType.project.length && state.businessUnit) {
      API('funds', { params: { businessUnitCode: state.businessUnit, type: 'project' } })
        .then(resp => resp.data.funds.map(f => f.fundCode))
        .then(project => setFundsByType(prevState => ({ ...prevState, project })))
        .catch(err => setError(new Error('Cannot retrieve project funds from Chart of Accounts API: ' + err.message, err)))
    }
  }, [state.businessUnit, fundsByType.operational, fundsByType.project])

  const handleBusinessUnitChange = (businessUnit) => {
    setState({
      businessUnit,
      fund: '',
      account: '',
      department: '',
      program: '',
      projectBusinessUnit: '',
      project: '',
      activity: '',
      resourceType: '',
      analysisType: ''
    })
  }

  const handleFundChange = (fund) => {
    setState(prevState => ({
      ...prevState,
      fund,
      program: '',
      projectBusinessUnit: '',
      project: '',
      activity: '',
      resourceType: '',
      analysisType: ''
    }))
  }

  const handleAccountChange = (account) => {
    setState(prevState => ({ ...prevState, account }))
  }

  const handleDepartmentChange = (department) => {
    setState(prevState => ({ ...prevState, department }))
  }

  const handleProgramChange = (program) => {
    setState(prevState => ({ ...prevState, program }))
  }

  const handleProjectBusinessUnitChange = (projectBusinessUnit) => {
    setState(prevState => ({
      ...prevState,
      projectBusinessUnit,
      project: '',
      activity: '',
      resourceType: '',
      analysisType: ''
    }))
  }

  const handleProjectChange = (project) => {
    setState(prevState => ({ ...prevState, project }))
  }

  const handleActivityChange = (activity) => {
    setState(prevState => ({ ...prevState, activity }))
  }

  const handleResourceTypeChange = (resourceType) => {
    setState(prevState => ({ ...prevState, resourceType }))
  }

  const handleAnalysisTypeChange = (analysisType) => {
    setState(prevState => ({ ...prevState, analysisType }))
  }

  const handleValidateClick = () => {
    setValidating(true)

    const timer = setTimeout(() => {
      const chartFieldString = {
        businessUnit: state.businessUnit ? state.businessUnit : null,
        fund: state.fund ? state.fund : null,
        account: state.account ? state.account : null,
        department: state.department ? state.department : null,
        program: state.program ? state.program : null,
        projectBusinessUnit: state.projectBusinessUnit ? state.projectBusinessUnit : null,
        project: state.project ? state.project : null,
        activity: state.activity ? state.activity : null,
        resourceType: state.resourceType ? state.resourceType : null,
        analysisType: state.analysisType ? state.analysisType : null
      }

      API.post('/chart-field-strings', { chartFieldStrings: [chartFieldString] })
        .then(resp => setValidationResult(resp.data.chartFieldStrings[0]))
        .then(setValidating(false))
        .catch(err => setError(new Error('Cannot validate chart field string using Chart of Accounts API', { cause: err })))
    }, 2000)

    return () => clearTimeout(timer)
  }

  function LoadingComponent() {
    return <p>Authentication in progress...</p>
  }

  return (
    <>
        <MsalAuthenticationTemplate
          interactionType={InteractionType.Redirect}
          authenticationRequest={loginRequest}
          errorComponent={ErrorModal}
          loadingComponent={LoadingComponent}
        >
          <div disabled={validating}>
            <Container>
              <Row className='validator-row align-items-center'>
                <Col>
                  <BusinessUnitSelector businessUnit={state.businessUnit} onSelect={handleBusinessUnitChange} />
                </Col>
                <Col>
                  {state.businessUnit}
                  {validationResult?.businessUnit?.messages && <Alert variant='danger'>{validationResult.businessUnit.messages}</Alert>}
                </Col>
                <Col>
                  {fundsByType.project.includes(state.fund) &&
                    <ProjectBusinessUnitSelector projectBusinessUnit={state.projectBusinessUnit} onSelect={handleProjectBusinessUnitChange} />
                  }
                </Col>
                <Col>
                  {fundsByType.project.includes(state.fund) &&
                    state.projectBusinessUnit
                  }
                </Col>
              </Row>
              <Row className='validator-row align-items-center'>
                <Col>{state.businessUnit &&
                    <FundSelector fund={state.fund} businessUnit={state.businessUnit} onSelect={handleFundChange} />
                  }
                </Col>
                <Col>
                  {state.fund}
                </Col>
                <Col>
                  {fundsByType.project.includes(state.fund) &&
                    <ProjectSelector project={state.project} projectBusinessUnit={state.projectBusinessUnit} onSelect={handleProjectChange} />
                  }
                </Col>
                <Col>
                  {fundsByType.project.includes(state.fund) &&
                    state.project
                  }
                </Col>
              </Row>
              <Row className='validator-row align-items-center'>
                <Col>{state.businessUnit &&
                    <AccountSelector account={state.account} businessUnit={state.businessUnit} onSelect={handleAccountChange} />
                  }
                </Col>
                <Col>
                  {state.account}
                </Col>
                <Col>
                  {fundsByType.project.includes(state.fund) &&
                    <ActivitySelector project={state.project} projectBusinessUnit={state.projectBusinessUnit} activity={state.activity} onSelect={handleActivityChange} />
                  }
                </Col>
                <Col>
                  {fundsByType.project.includes(state.fund) &&
                    state.activity
                  }
                </Col>
              </Row>
              <Row className='validator-row align-items-center'>
                <Col>{state.businessUnit &&
                    <DepartmentSelector department={state.department} businessUnit={state.businessUnit} onSelect={handleDepartmentChange} />
                  }
                </Col>
                <Col>
                  {state.department}
                </Col>
                <Col>
                  {fundsByType.project.includes(state.fund) &&
                    <ResourceTypeSelector resourceType={state.resourceType} projectBusinessUnit={state.projectBusinessUnit} onSelect={handleResourceTypeChange} />
                  }
                </Col>
                <Col>
                  {fundsByType.project.includes(state.fund) &&
                    state.resourceType
                  }
                </Col>
              </Row>
              <Row className='validator-row align-items-center'>
                <Col>
                  {fundsByType.operational.includes(state.fund) &&
                    <ProgramSelector program={state.program} businessUnit={state.businessUnit} onSelect={handleProgramChange} />
                  }
                </Col>
                <Col>
                  {fundsByType.operational.includes(state.fund) &&
                    state.program
                  }
                </Col>
                <Col>
                  {fundsByType.project.includes(state.fund) &&
                    <AnalysisTypeSelector analysisType={state.analysisType} projectBusinessUnit={state.projectBusinessUnit} onSelect={handleAnalysisTypeChange} />
                  }
                </Col>
                <Col>
                  {fundsByType.project.includes(state.fund) &&
                    state.analysisType
                  }
                </Col>
              </Row>
            </Container>
            <ValidateButton chartFieldString={state} validating={validating} setValidating={setValidating} handleValidateClick={handleValidateClick} />
            <br />
            <Container className='min-vh-10'>
              <Row className='validator-result-row'>
                <Col xs={1}>
                  {validationResult && validationResult.valid && <Image src='green-check.svg' width={50} height={50} />}
                  {validationResult && !validationResult.valid && <Image src='red-x.svg' width={50} height={50} />}
                </Col>
                <Col xs={11}>
                  {validationResult?.messages && <Alert variant='warning' className="text-center">{validationResult.messages}</Alert>}
                  {validationResult && validationResult.valid && <Alert variant='success' className="text-center">Valid chart field string</Alert>}
                </Col>
              </Row>
            </Container>
          </div>
        </MsalAuthenticationTemplate>
    </>
  )
}

Validator.propTypes = {
  error: PropTypes.object
}

export default Validator
