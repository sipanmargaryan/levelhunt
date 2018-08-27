import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ResetComponent from '../components/forgot/ResetComponent'
import { resetPassword } from '../actions/auth'
import { isAuthenticated, getSuccessMsg } from '../reducers'
import Validator from 'validator'

class ResetContainer extends Component {
	state = {
		password: '',
		confirmPassword: '',
		error: {
			password: false,
			confirmPassword: false
		}
	}

	componentDidUpdate() {
		if (this.props.isAuthenticated) {
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
		if (this.validateInput()) {
			this.props.resetPassword(this.state.password, this.props.match.params.token)
		}
	}

	validateInput = () => {
		const formErrors = {
			error: {
				password: this.state.password === '' || this.state.password.length < 6,
				confirmPassword:
					this.state.confirmPassword === '' || !Validator.equals(this.state.password, this.state.confirmPassword)
			}
		}
		this.setState(formErrors)
		const localErrors = formErrors.error
		return !(localErrors.password || localErrors.confirmPassword)
	}

	render() {
		return (
			<ResetComponent
				handleInputChange={this.handleInputChange}
				onSubmit={this.onSubmit}
				successMsg={this.props.successMsg}
				state={this.state}
			/>
		)
	}
}

const mapStateToProps = state => ({
	isAuthenticated: isAuthenticated(state),
	successMsg: getSuccessMsg(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({ resetPassword }, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ResetContainer)
