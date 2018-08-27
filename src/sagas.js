import { takeEvery, all, put } from 'redux-saga/effects'
import * as notification from './utils/notification'
import * as userActions from './actions/users'
import * as authActions from './actions/auth'



function* changeUserPasswordAsync(action){
    yield notification.createNotification('success', action.payload.msg)
}

function* watchChangePasswordAsync() {
    yield takeEvery(userActions.CHANGE_USER_PASSWORD_SUCCESS, changeUserPasswordAsync)
}

function* changeAvatar(action) {
    yield put({type : authActions.CHANGE_AVATAR, payload: action.payload})
}

function* changeAvatarAsync() {
    yield takeEvery(userActions.CHANGE_PROFILE_IMAGE_SUCCESS, changeAvatar)
}

export default function* rootSaga() {
    yield all([
        watchChangePasswordAsync(),
        changeAvatarAsync()
    ])
}