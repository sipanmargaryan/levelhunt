import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { func } from 'prop-types'
import { confirmEmail } from '../actions/auth'
import { withRouter } from 'react-router-dom'
import { authErrors, isAuthenticated } from '../reducers'

class ConfirmContainer extends Component {
	constructor(props) {
		super(props)
		this.props.confirmEmail(this.props.match.params.token)
	}

	componentDidUpdate() {
		if (this.props.isAuthenticated) {
			return this.props.history.push('/')
		}

		if (this.props.errors) {
			this.props.history.push('/login')
		}
	}

	render() {
		return <div />
	}
}

ConfirmContainer.propTypes = {
	confirmEmail: func.isRequired
}

const mapStateToProps = state => ({
	errors: authErrors(state),
	isAuthenticated: isAuthenticated(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({ confirmEmail }, dispatch)

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ConfirmContainer)
)
