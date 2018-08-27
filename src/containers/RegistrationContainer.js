import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { func } from 'prop-types'
import RegistrationComponent from '../components/registration/RegistrationComponent'
import { registration } from '../actions/auth'
import { authErrors, getSuccessMsg, isAuthenticated } from '../reducers'

class RegistrationContainer extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		privacy_policy: false
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
		this.props.registration(this.state.username, this.state.email, this.state.password)
	}

	render() {
		return (
			<div className="login-page">
				<RegistrationComponent
					onSubmit={this.onSubmit}
					handleInputChange={this.handleInputChange}
					errors={this.props.errors}
					successMsg={this.props.successMsg}
					state={this.state}
				/>
			</div>
		)
	}
}

RegistrationContainer.propTypes = {
	registration: func.isRequired
}

const mapStateToProps = state => ({
	errors: authErrors(state),
	isAuthenticated: isAuthenticated(state),
	successMsg: getSuccessMsg(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({ registration }, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegistrationContainer)
