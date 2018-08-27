import { RSAA, getJSON } from 'redux-api-middleware'
import { withAuth } from '../reducers/index'

export const PROFILE_REQUEST = 'PROFILE_REQUEST'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
export const PROFILE_FAILURE = 'PROFILE_FAILURE'

export const CHANGE_USER_PROFILE_REQUEST = 'CHANGE_USER_PROFILE_REQUEST'
export const CHANGE_USER_PROFILE_SUCCESS = 'CHANGE_USER_PROFILE_SUCCESS'
export const CHANGE_USER_PROFILE_FAILURE = 'CHANGE_USER_PROFILE_FAILURE'

export const CHANGE_USER_PASSWORD_REQUEST = 'CHANGE_USER_PASSWORD_REQUEST'
export const CHANGE_USER_PASSWORD_SUCCESS = 'CHANGE_USER_PASSWORD_SUCCESS'
export const CHANGE_USER_PASSWORD_FAILURE = 'CHANGE_USER_PASSWORD_FAILURE'

export const CHANGE_PROFILE_IMAGE_REQUEST = 'CHANGE_PROFILE_IMAGE_REQUEST'
export const CHANGE_PROFILE_IMAGE_SUCCESS = 'CHANGE_PROFILE_IMAGE_SUCCESS'
export const CHANGE_PROFILE_IMAGE_FAILURE = 'CHANGE_PROFILE_IMAGE_FAILURE'

export const getUserProfileInfo = () => ({
	[RSAA]: {
		endpoint: '/users/profile/',
		method: 'GET',
		headers: withAuth(),
		types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE]
	}
})

export const changeUserProfile = data => ({
	[RSAA]: {
		endpoint: '/users/profile/',
		method: 'PUT',
		body: JSON.stringify(data),
		headers: withAuth(),
		types: [CHANGE_USER_PROFILE_REQUEST, CHANGE_USER_PROFILE_SUCCESS, CHANGE_USER_PROFILE_FAILURE]
	}
})

export const changeUserPassword = data => ({
	[RSAA]: {
		endpoint: '/users/profile/change-password/',
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: withAuth(),
		types: [
			CHANGE_USER_PASSWORD_REQUEST,
            CHANGE_USER_PASSWORD_SUCCESS,
			CHANGE_USER_PASSWORD_FAILURE
		]
	}
})

export const changeProfileImage = data => ({
	[RSAA]: {
		endpoint: '/users/profile/change-avatar/',
		method: 'POST',
		body: data,
		headers: withAuth({}),
		types: [
			CHANGE_PROFILE_IMAGE_REQUEST,
			CHANGE_PROFILE_IMAGE_SUCCESS,
			CHANGE_PROFILE_IMAGE_FAILURE
		]
	}
})
