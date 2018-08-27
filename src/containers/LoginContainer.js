import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginComponent from '../components/login/LoginComponent'
import { login } from '../actions/auth'
import { authErrors, isAuthenticated } from '../reducers'

class LoginContainer extends Component {
	state = {
		login: '',
		password: ''
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
		this.props.login(this.state.login, this.state.password)
	}

	render() {
		return (
			<div className="login-page">
				<LoginComponent
					onSubmit={this.onSubmit}
					handleInputChange={this.handleInputChange}
					state={this.state}
					errors={this.props.errors}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	errors: authErrors(state),
	isAuthenticated: isAuthenticated(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginContainer)
