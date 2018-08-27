import React, { Component } from 'react'
import { Jumbotron, Form } from 'reactstrap'
import { Link } from 'react-router-dom'
import TextInput from '../TextInput'

class RegistrationComponent extends Component {
	render() {
		const errors = this.props.errors || {}

		const inputs = [
			{
				name: 'username',
				label: 'Username',
				placeholder: 'Username',
				error: errors.username,
				onChange: this.props.handleInputChange,
				value: this.props.state.username,
				required: true
			},
			{
				name: 'email',
				label: 'Email',
				placeholder: 'Email',
				error: errors.email,
				onChange: this.props.handleInputChange,
				value: this.props.state.email,
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
				{!this.props.successMsg ? (
					<div className="login__form_box">
						<div className="row">
							<div className="col-lg-12">
								<h3 className="login__form_text">Sign Up</h3>
								<p align="center">LEVEL HUNT</p>
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
										Sign Up
									</button>
								</div>
								<div className="col-lg-8">
									<Link to="#"> I agree to terms of use and privacy policy</Link>
									<TextInput
										name="privacy_policy"
										required
										error={errors.privacy_policy}
										type="checkbox"
										onChange={this.props.handleInputChange}
									/>
								</div>
							</div>
						</Form>
					</div>
				) : (
					<div className="col-md-12">
						<h2 className="alert-success">{this.props.successMsg}</h2>
						<p>Weve sent an email to {this.props.state.email}. </p>
						<p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
					</div>
				)}
			</Jumbotron>
		)
	}
}

export default RegistrationComponent
