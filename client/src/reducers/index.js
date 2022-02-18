import { combineReducers } from "redux"

import userAuth from './userAuth'
import userStatus from './userStatus'
import talkRequestNotification from './talkRequestNotification'
import user from './user'

export default combineReducers({
    userAuth,
    userStatus,
    talkRequestNotification,
    user
})