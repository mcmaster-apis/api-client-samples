import React from 'react'
import PropTypes from 'prop-types'
import ErrorModal from './ErrorModal'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorModal error={this.state.error} />
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
}

export default ErrorBoundary
