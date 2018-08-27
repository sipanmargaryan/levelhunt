import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { localeReducer } from 'react-redux-localization'
import auth, * as fromAuth from './auth'
import app from './app'
import skills, * as fromSkills from './skills'
import users, * as fromUsers from './users'

export default combineReducers({
	auth: auth,
	app: app,
	skills: skills,
	users: users,
	locale: localeReducer,
	router: routerReducer
})

export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth)
export const accessToken = state => fromAuth.accessToken(state.auth)
export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.auth)
export const refreshToken = state => fromAuth.refreshToken(state.auth)
export const isRefreshTokenExpired = state => fromAuth.isRefreshTokenExpired(state.auth)
export const getUser = state => fromAuth.getUser(state.auth)
export const authErrors = state => fromAuth.errors(state.auth)
export const getSuccessMsg = state => fromAuth.getSuccessMsg(state.auth)
export const getSkills = state => fromSkills.getSkills(state.skills)
export const getUserInfo = state => fromUsers.getUserInfo(state.users)
export const cropperAvatar = state => fromUsers.cropperAvatar(state.users)
export const userErrors = state => fromUsers.errors(state.users)
export const getLanguageCode = state => state.locale

export function withAuth(headers = { 'Content-Type': 'application/json' }) {
	return state => ({
		...headers,
		Authorization: `Bearer ${accessToken(state)}`,
		'Accept-Language': getLanguageCode(state)
	})
}

export function withLanguage(headers = { 'Content-Type': 'application/json' }) {
	return state => ({
		...headers,
		'Accept-Language': getLanguageCode(state) ? getLanguageCode(state): 'en'
	})
}
