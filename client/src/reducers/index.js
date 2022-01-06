import { combineReducers } from "redux"

import userAuth from './userAuth'
import userStatus from './userStatus'

export default combineReducers({
    userAuth,
    userStatus
})