import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { func } from 'prop-types'
import Validator from 'validator'
import { has } from '../utils/index'
import ProfileComponent from '../components/profile/ProfileComponent'
import { getUserInfo, userErrors, getUser, cropperAvatar } from '../reducers'
import { getUserProfileInfo, changeUserProfile, changeUserPassword, changeProfileImage } from '../actions/users'

class ProfileContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			profile: {
				first_name: '',
				last_name: '',
				title: '',
				email: '',
				birthday: '',
				username: '',
				bio: '',
				available_for_hire: false,
				email_notification_settings: []
			},
			password: {
				old_password: '',
				new_password: '',
				confirm_password: ''
			},
			avatarPreview: '',
			error: {
				password: false,
				confirmPassword: false
			}
		}
		if (!this.props.userProfileInfo.email) {
			this.props.getUserProfileInfo()
		}
		this.baseState = JSON.parse(JSON.stringify(this.state))
	}

	componentDidUpdate(prevProps) {
		if (this.props.userProfileInfo !== prevProps.userProfileInfo) {
			this.setState({ profile: this.props.userProfileInfo })
		}
	}

	handleInputChange = event => {
		let newState = this.state
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name

		if (has.call(this.state.password, name)) {
			newState['password'][name] = value
		} else if (has.call(this.state.profile, name)) {
			newState['profile'][name] = value
		} else {
			if (target.type === 'checkbox') {
				this.state.profile.email_notification_settings.map(emailSettings => {
					if (emailSettings.notification_type === name) {
						emailSettings.enabled = value
					}
				})
			}
			newState[name] = value
		}

		this.setState(newState)
	}

	onSubmit = event => {
		event.preventDefault()
		this.props.changeUserProfile(this.state.profile)
	}

	onSubmitPassword = event => {
		event.preventDefault()
		if (this.validateInput()) {
			this.props.changeUserPassword({
				old_password: this.state.password.old_password,
				new_password: this.state.password.new_password
			})
			this.setState({ password: this.baseState })
		}
	}

	validateInput = () => {
		const formErrors = {
			error: {
				password: this.state.password.new_password === '' || this.state.password.new_password.length < 6,
				confirmPassword:
					this.state.password.confirm_password === '' ||
					!Validator.equals(this.state.password.new_password, this.state.password.confirm_password)
			}
		}
		this.setState(formErrors)
		const localErrors = formErrors.error
		return !(localErrors.password || localErrors.confirmPassword)
	}

	onDrop = files => {
		this.setState({ avatarPreview: files[0].preview })
	}

	render() {
		return (
			<ProfileComponent
				handleInputChange={this.handleInputChange}
				onSubmit={this.onSubmit}
				onSubmitPassword={this.onSubmitPassword}
				onDrop={this.onDrop}
				changeProfileImage={this.props.changeProfileImage}
				profile={this.state.profile}
				password={this.state.password}
				error={this.state.error}
				errors={this.props.errors}
				avatarPreview={this.state.avatarPreview}
				userAvatar={this.props.user.avatar}
				cropperAvatar={this.props.cropperAvatar}
			/>
		)
	}
}

ProfileContainer.propTypes = {
	getUserProfileInfo: func.isRequired
}

const mapStateToProps = state => ({
	userProfileInfo: getUserInfo(state),
	user: getUser(state),
	cropperAvatar: cropperAvatar(state),
	errors: userErrors(state)
})

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getUserProfileInfo, changeUserProfile, changeUserPassword, changeProfileImage }, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileContainer)
