import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Form } from 'reactstrap'
import TextInput from '../TextInput'
import Cropper from 'react-cropper'

class ProfileComponent extends Component {
	_crop() {
		this.refs.cropper.getCroppedCanvas().toBlob(blob => {
			const formData = new FormData()
			formData.append('avatar', blob, 'avatar.png')
			this.props.changeProfileImage(formData)
		})
	}

	renderAvatar() {
		let preview = <img src="/images/default.png" width="100px" height="100px" alt="avatar" />
		if (this.props.cropperAvatar) {
			preview = <img src={this.props.cropperAvatar} width="100px" height="100px" alt="avatar" />
		} else {
			if (this.props.userAvatar) {
				preview = <img src={this.props.userAvatar} width="100px" height="100px" alt="avatar" />
			} else {
				preview = <img src={this.props.avatarPreview} width="100px" height="100px" alt="avatar" />
			}
		}
		return (
			<div className="col-md-3">
				<div className="text-center">
					{preview}
					<Dropzone
						onDrop={this.props.onDrop}
						accept=".jpeg,.png,.jpg"
						name="image"
						multiple={false}
						className="itemPhoto profileBtn w-30"
					>
						<p>CHANGE PHOTO</p>
					</Dropzone>
					{/*https://github.com/roadmanfong/react-cropper*/}
					<Cropper
						ref="cropper"
						src={this.props.avatarPreview}
						style={{ height: 400, width: '100%' }}
						aspectRatio={16 / 16}
						guides={false}
						crop={this._crop.bind(this)}
					/>
				</div>
			</div>
		)
	}

	render() {
		const errors = this.props.errors || {}
		const error = this.props.error
		const errorMsg = {
			password: error.password ? 'Enter a invalid password' : '',
			confirmPassword: error.confirmPassword ? 'Enter a valid confirm password' : ''
		}

		const infoInputs = [
			{
				name: 'username',
				label: 'Username',
				placeholder: 'Username',
				error: errors.username,
				onChange: this.props.handleInputChange,
				readOnly: true,
				value: this.props.profile.username,
				className: 'form_input'
			},
			{
				name: 'email',
				label: 'Email',
				placeholder: 'Email address',
				error: errors.email,
				onChange: this.props.handleInputChange,
				value: this.props.profile.email,
				className: 'form_input'
			},
			{
				name: 'first_name',
				label: 'First Name',
				placeholder: 'First name',
				error: errors.firstName,
				onChange: this.props.handleInputChange,
				value: this.props.profile.first_name,
				className: 'form_input'
			},
			{
				name: 'last_name',
				label: 'Last Name',
				placeholder: 'Last name',
				error: errors.lastName,
				onChange: this.props.handleInputChange,
				value: this.props.profile.last_name,
				className: 'form_input'
			},
			{
				name: 'birthday',
				label: 'Birthday',
				placeholder: 'Birthday',
				error: errors.birthday,
				onChange: this.props.handleInputChange,
				type: 'date',
				value: this.props.profile.birthday,
				className: 'form_input'
			},
			{
				name: 'title',
				label: 'Title',
				placeholder: 'Title',
				error: errors.title,
				onChange: this.props.handleInputChange,
				value: this.props.profile.title,
				className: 'form_input'
			},
			{
				name: 'bio',
				label: 'Bio',
				placeholder: 'Bio',
				error: errors.bio,
				onChange: this.props.handleInputChange,
				type: 'textarea',
				value: this.props.profile.bio,
				className: 'form_textarea'
			},
			{
				name: 'available_for_hire',
				label: 'Available for hire',
				error: errors.available_for_hire,
				onChange: this.props.handleInputChange,
				type: 'checkbox',
				checked: this.props.profile.available_for_hire
			}
		]

		this.props.profile.email_notification_settings.map(emailSettings => {
			let checkboxEmailSettings = {}
			checkboxEmailSettings.name = emailSettings.notification_type
			checkboxEmailSettings.label = emailSettings.notification_text
			checkboxEmailSettings.error = errors.email_notification_settings
			checkboxEmailSettings.onChange = this.props.handleInputChange
			checkboxEmailSettings.type = 'checkbox'
			checkboxEmailSettings.checked = emailSettings.enabled
			infoInputs.push(checkboxEmailSettings)
		})

		const passInputs = [
			{
				name: 'old_password',
				label: 'Old Password',
				placeholder: 'Old Password',
				error: errors.old_password,
				onChange: this.props.handleInputChange,
				value: this.props.password.old_password,
				type: 'password',
				required: true,
				className: 'form_input',
                autoComplete: 'off'
			},
			{
				name: 'new_password',
				label: 'New Password',
				placeholder: 'New Password',
				error: errors.new_password,
				onChange: this.props.handleInputChange,
				value: this.props.password.new_password,
				type: 'password',
				required: true,
				className: 'form_input',
                autoComplete: 'off'
			},
			{
				name: 'confirm_password',
				label: 'Confirm Password',
				placeholder: 'Confirm Password',
				error: errors.confirm_password,
				onChange: this.props.handleInputChange,
				value: this.props.password.confirm_password,
				type: 'password',
				required: true,
				className: 'form_input',
                autoComplete: 'off'
			}
		]
		return (
			<div className="row">
				{this.renderAvatar()}

				<div className="col-md-6 personal-info">
					<h3>Personal info</h3>

					<Form onSubmit={this.props.onSubmit}>
						{infoInputs.map((infoInput, key) => {
							return (
								<div key={key} className="form-group">
									<div className="col-lg-10">
										<TextInput {...infoInput} />
									</div>
								</div>
							)
						})}

						<div className="form-group">
							<label className="col-md-3 control-label" />
							<div className="col-md-8">
								<input type="submit" className="btn btn-primary" value="Save Changes" />
								<span />
							</div>
						</div>
					</Form>
				</div>
				<div className="col-md-3">
					<h3>Change Password</h3>
					<Form onSubmit={this.props.onSubmitPassword}>
						{passInputs.map((passInput, key) => {
							return (
								<div key={key} className="form-group">
									<div className="col-lg-10">
										<TextInput {...passInput} />
									</div>
								</div>
							)
						})}
						<span className="small">{errorMsg.password}</span>
						<span className="small">{errorMsg.confirmPassword}</span>
						<div className="form-group">
							<label className="col-md-3 control-label" />
							<div className="col-md-8">
								<input type="submit" className="btn btn-primary" value="Change Password" />
								<span />
							</div>
						</div>
					</Form>
				</div>
			</div>
		)
	}
}

export default ProfileComponent
