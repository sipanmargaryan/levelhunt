import React, { Component } from 'react'
import { Alert, Jumbotron, Form } from 'reactstrap'
import { Link } from 'react-router-dom'

import TextInput from '../TextInput'

class LoginComponent extends Component {
	render() {
		const errors = this.props.errors || {}

		const inputs = [
			{
				name: 'login',
				label: 'Email or Username',
				placeholder: 'Email or Username',
				error: errors.login,
				onChange: this.props.handleInputChange,
				value: this.props.state.login,
				required: true
			},
			{
				name: 'password',
				label: 'Password',
				placeholder: 'Password',
				error: errors.password,
				onChange: this.props.handleInputChange,
				value: this.props.state.password,
				type: 'password',
				required: true
			}
		]

		return (
			<Jumbotron className="container">
				<div className="login__form_box">
					<div className="row">
						<div className="col-lg-12">
							<h3 className="login__form_text">Sign in</h3>
							<p align="center">LEVEL HUNT</p>
							{errors.length > 0 ? <Alert color="danger">{errors[0]}</Alert> : ''}
						</div>
						<div className="col-lg-4">
							<button className="linkedin__btn">Linkedin</button>
						</div>
						<div className="col-lg-4">
							<button className="google__btn">Google</button>
						</div>
						<div className="col-lg-4">
							<button className="github__btn">Github</button>
						</div>
					</div>
					<Form onSubmit={this.props.onSubmit}>
						<div className="row">
							<div className="form">
								{inputs.map((input, key) => {
									return (
										<div key={key} className="col-lg-12 ">
											<TextInput className="form_input" {...input} />
										</div>
									)
								})}
							</div>
							<div className="col-lg-4 ">
								<button type="submit" className="sign__in_btn">
									Sign In
								</button>
							</div>
							<div className="col-lg-8">
								<Link to="/forgot-password/">Forgot your password?</Link>
							</div>
							<div className="col-lg-12 pt-3">
								Need an acount?
								<Link to="/registration" className="signup__link">
									{' '}
									Sign up
								</Link>
							</div>
						</div>
					</Form>
				</div>
			</Jumbotron>
		)
	}
}

export default LoginComponent
