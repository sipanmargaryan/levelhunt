import React, { Component } from 'react'
import { Alert, Button, Jumbotron, Form } from 'reactstrap'

import TextInput from '../TextInput'

class ForgotComponent extends Component {
	render() {
		const errors = this.props.errors || {}

		return (
			<Jumbotron className="container">
				<Form onSubmit={this.props.onSubmit}>
					<h1>Confirm</h1>
					<span className="alert-success">{this.props.successMsg}</span>
					{errors.length > 0 ? <Alert color="danger">{errors[0]}</Alert> : ''}
					<TextInput
						name="email"
						value={this.props.state.email}
						required
						label="Email"
						error={errors.email}
						onChange={this.props.handleInputChange}
						className="form_input"
					/>
					<Button type="submit" color="primary" size="lg">
						Confirm
					</Button>
				</Form>
			</Jumbotron>
		)
	}
}

export default ForgotComponent
