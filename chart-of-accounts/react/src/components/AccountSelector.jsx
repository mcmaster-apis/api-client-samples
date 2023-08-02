import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'

import API from '../api'

const DropDownItems = (props) => {
  return Object.entries(props.accounts).map((entry, index) => {
    return (
      <Dropdown.Item key={index} eventKey={entry[1].accountCode} active={entry[1].accountCode === props.account}><b>{entry[1].accountCode}</b> {entry[1].description}</Dropdown.Item>
    )
  })
}

const AccountSelector = (props) => {
  const [accounts, setAccounts] = useState([])
  const [error, setError] = useState(null)

  if (error) {
    throw error
  }

  useEffect(() => {
    if (!accounts.length && props.businessUnit) {
      API('accounts', { params: { businessUnitCode: props.businessUnit } })
        .then(resp => setAccounts(resp.data.accounts.sort((a, b) => a.accountCode - b.accountCode)))
        .catch(err => setError(new Error('Cannot retrieve accounts from Chart of Accounts API: ' + err.message, err)))
    }
  }, [props.businessUnit, accounts.length])

  return (
    <Stack direction='horizontal' gap={2}>
      <Dropdown onSelect={props.onSelect}>
        <Dropdown.Toggle id="account-selector">
          Account
        </Dropdown.Toggle>
        <Dropdown.Menu className='scrolled-dropdown'>
          { !accounts.length && props.businessUnit && <Spinner
            className='dropdown-spinner'
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true" />
          }
          <DropDownItems accounts={accounts} account={props.account} />
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  )
}

AccountSelector.propTypes = {
  account: PropTypes.string.isRequired,
  businessUnit: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default AccountSelector
