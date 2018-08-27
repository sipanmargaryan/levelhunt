import jwtDecode from 'jwt-decode'
import * as auth from '../actions/auth'

const initialState = {
	access: undefined,
	refresh: undefined,
	errors: [],
	successMsg: '',
	user: {
		email: '',
		firstName: '',
		lastName: '',
		avatar: ''
	}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case auth.LOGIN_SUCCESS:
		case auth.CONFIRM_SUCCESS:
		case auth.RESET_SUCCESS:
			return {
				...state,
				access: {
					token: action.payload.access_token,
					...jwtDecode(action.payload.access_token)
				},
				refresh: {
					token: action.payload.refresh_token,
					...jwtDecode(action.payload.refresh_token)
				},
				user: action.payload.user,
				errors: [],
				successMsg: ''
			}
		case auth.FORGOT_SUCCESS:
			return {
				...state,
				successMsg: action.payload.msg
			}
		case auth.REGISTRATION_SUCCESS:
			return {
				...state,
				successMsg: action.payload.msg
			}
		case auth.TOKEN_RECEIVED:
			return {
				...state,
				access: {
					token: action.payload.access,
					...jwtDecode(action.payload.access)
				}
			}
		case auth.LOGOUT:
			return {
				user: initialState.user,
				token: undefined,
				access: undefined
			}
		case auth.RESET_FAILURE:
		case auth.CONFIRM_FAILURE: {
			let errors = []
			for (let error in action.payload.response) {
				if (error.non_field_errors) {
					errors.concat(error.non_field_errors)
				}
				if (error.token) {
					errors.concat(error.token)
				}
			}

			return {
				...state,
				errors: errors
			}
		}
		case auth.FORGOT_FAILURE:
			return {
				...state,
				errors: action.payload.response
			}
		case auth.LOGIN_FAILURE:
		case auth.TOKEN_FAILURE:
		case auth.REGISTRATION_FAILURE:
			return {
				...state,
				access: undefined,
				refresh: undefined,
				errors: action.payload.response.non_field_errors
			}
		case auth.CHANGE_AVATAR:
			return {
				...state,
				user: {
					...state.user,
					avatar: action.payload.avatar
				}
			}
		default:
			return state
	}
}

export function accessToken(state) {
	if (state.access) {
		return state.access.token
	}
}

export function isAccessTokenExpired(state) {
	if (state.access && state.access.exp) {
		return 1000 * state.access.exp - new Date().getTime() < 5000
	}
	return true
}

export function refreshToken(state) {
	if (state.refresh) {
		return state.refresh.token
	}
}

export function isRefreshTokenExpired(state) {
	if (state.refresh && state.refresh.exp) {
		return 1000 * state.refresh.exp - new Date().getTime() < 5000
	}
	return true
}

export function isAuthenticated(state) {
	return !isRefreshTokenExpired(state)
}

export function errors(state) {
	return state.errors
}

export function getSuccessMsg(state) {
	return state.successMsg
}

export function getUser(state) {
	return state.user
}
