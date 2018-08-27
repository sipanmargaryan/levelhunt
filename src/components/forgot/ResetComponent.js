import React, { Component } from 'react'
import { Alert, Button, Jumbotron, Form } from 'reactstrap'
import TextInput from '../TextInput'

class ResetComponent extends Component {
	render() {
		const errors = this.props.errors || {}
		const error = this.props.state.error
		const errorMsg = {
			password: error.password ? 'Enter a invalid password' : '',
			confirmPassword: error.confirmPassword ? 'Enter a valid confirm password' : ''
		}

		const inputs = [
			{
				name: 'password',
				label: 'Password',
				placeholder: 'Password',
				error: errors.password,
				onChange: this.props.handleInputChange,
				value: this.props.state.password,
				type: 'password',
				required: true
			},
			{
				name: 'confirmPassword',
				label: 'Confirm Password',
				placeholder: 'Confirm Password',
				error: errors.confirmPassword,
				onChange: this.props.handleInputChange,
				value: this.props.state.confirmPassword,
				type: 'password',
				required: true
			}
		]

		return (
			<Jumbotron className="container">
				<Form onSubmit={this.props.onSubmit}>
					<h1>Change Password</h1>
					<span className="alert-success">{this.props.successMsg}</span>
					{errors.length > 0 ? <Alert color="danger">{errors[0]}</Alert> : ''}
					{inputs.map((input, key) => {
						return <TextInput className="form_input" key={key} {...input} />
					})}
					<span className="small">{errorMsg.password}</span>
					<span className="small">{errorMsg.confirmPassword}</span>
					<Button type="submit" color="primary" size="lg">
						Change Password
					</Button>
				</Form>
			</Jumbotron>
		)
	}
}

export default ResetComponent
