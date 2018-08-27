import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ForgotComponent from '../components/forgot/ForgotComponent'
import * as notification from '../utils/notification'
import { forgotPassword } from '../actions/auth'
import { isAuthenticated, authErrors, getSuccessMsg } from '../reducers'

class ForgotContainer extends Component {
	state = {
		email: ''
	}

	componentDidUpdate() {
		if (this.props.isAuthenticated) {
			this.props.history.push('/')
		}

		if (this.props.errors) {
			notification.createNotification('error', this.props.errors)
			this.props.history.push('/')
		}
		if (this.props.successMsg) {
			notification.createNotification('success', this.props.successMsg)
			this.props.history.push('/')
		}
	}

	handleInputChange = event => {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name

		this.setState({
			[name]: value
		})
	}

	onSubmit = event => {
		event.preventDefault()
		this.props.forgotPassword(this.state.email)
	}

	render() {
		return (
			<ForgotComponent
				handleInputChange={this.handleInputChange}
				onSubmit={this.onSubmit}
				state={this.state}
				successMsg={this.props.getSuccessMsg}
				errors={this.props.errors}
			/>
		)
	}
}

const mapStateToProps = state => ({
	isAuthenticated: isAuthenticated(state),
	errors: authErrors(state),
	getSuccessMsg: getSuccessMsg(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({ forgotPassword }, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ForgotContainer)
