import { RSAA } from 'redux-api-middleware'
import { withLanguage } from '../reducers/index'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST'
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS'
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE'

export const CONFIRM_REQUEST = 'CONFIRM_REQUEST'
export const CONFIRM_SUCCESS = 'CONFIRM_SUCCESS'
export const CONFIRM_FAILURE = 'CONFIRM_FAILURE'

export const RESET_REQUEST = 'RESET_REQUEST'
export const RESET_SUCCESS = 'RESET_SUCCESS'
export const RESET_FAILURE = 'RESET_FAILURE'

export const FORGOT_REQUEST = 'FORGOT_REQUEST'
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS'
export const FORGOT_FAILURE = 'FORGOT_FAILURE'

export const TOKEN_REQUEST = 'TOKEN_REQUEST'
export const TOKEN_RECEIVED = 'TOKEN_RECEIVED'
export const TOKEN_FAILURE = 'TOKEN_FAILURE'

export const LOGOUT = 'LOGOUT'
export const CHANGE_AVATAR = 'CHANGE_AVATAR'

export const logout = () => {
	return {
		type: LOGOUT
	}
}

export const login = (login, password) => ({
	[RSAA]: {
		endpoint: '/users/auth/login/',
		method: 'POST',
		body: JSON.stringify({ login, password }),
		headers: withLanguage(),
		types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]
	}
})

export const registration = (username, email, password) => ({
	[RSAA]: {
		endpoint: '/users/auth/signup/',
		method: 'POST',
		body: JSON.stringify({ username, email, password }),
		headers: withLanguage(),
		types: [REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_FAILURE]
	}
})

export const confirmEmail = token => ({
	[RSAA]: {
		endpoint: '/users/auth/confirm-email/',
		method: 'POST',
		body: JSON.stringify({ token }),
		headers: withLanguage(),
		types: [CONFIRM_REQUEST, CONFIRM_SUCCESS, CONFIRM_FAILURE]
	}
})

export const forgotPassword = email => ({
	[RSAA]: {
		endpoint: '/users/auth/forgot-password/',
		method: 'POST',
		body: JSON.stringify({ email }),
		headers: withLanguage(),
		types: [FORGOT_REQUEST, FORGOT_SUCCESS, FORGOT_FAILURE]
	}
})

export const resetPassword = (password, token) => ({
	[RSAA]: {
		endpoint: '/users/auth/reset-password/',
		method: 'POST',
		body: JSON.stringify({ password, token }),
		headers: withLanguage(),
		types: [RESET_REQUEST, RESET_SUCCESS, RESET_FAILURE]
	}
})

export const refreshAccessToken = token => ({
	[RSAA]: {
		endpoint: '/users/auth/refresh-token/',
		method: 'POST',
		body: JSON.stringify({ refresh: token }),
		headers: withLanguage(),
		types: [TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE]
	}
})

export const changeAvatar = payload => {
	return {
		type: CHANGE_AVATAR,
		payload
	}
}
