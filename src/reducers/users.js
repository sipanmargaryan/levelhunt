import * as users from '../actions/users'

const initialState = {
	userInfo: {
		username: '',
		email: '',
		first_name: '',
		last_name: '',
		birthday: '',
		title: '',
		bio: '',
		available_for_hire: false,
		email_notification_settings: []
	},
	errors: [],
	avatar: ''
}

export default (state = initialState, action) => {
	switch (action.type) {
		case users.PROFILE_SUCCESS:
			return {
				...state,
				userInfo: action.payload
			}
		case users.CHANGE_USER_PASSWORD_SUCCESS:
			return state // TODO We haven't decided to keep or remove this yet.
		case users.CHANGE_PROFILE_IMAGE_SUCCESS:
			return {
				...state,
				avatar: action.payload.avatar
			}
		case users.PROFILE_FAILURE:
			return {
				...state,
				errors: action.payload.response
			}
		case users.CHANGE_USER_PASSWORD_FAILURE:
			return {
				...state,
				errors: action.payload.response
			}
		case users.CHANGE_USER_PROFILE_SUCCESS:
			return {
				...state,
				userInfo: action.payload
			}
		default:
			return state
	}
}

export function getUserInfo(state) {
	return state.userInfo
}
export function cropperAvatar(state) {
	return state.avatar
}

export function errors(state) {
	return state.errors
}
