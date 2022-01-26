import { combineReducers } from "redux"

import userAuth from './userAuth'
import userStatus from './userStatus'
import talkRequestNotification from './talkRequestNotification'

export default combineReducers({
    userAuth,
    userStatus,
    talkRequestNotification
})