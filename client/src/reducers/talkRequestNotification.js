import {
    SENDING_TALK_REQUEST,
    SET_TALK_REQUEST_NOTIFICATION,
} from '../actions/types'

const initialState = {
    talk_request_notification: null
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case SET_TALK_REQUEST_NOTIFICATION:
            return {
                ...state = initialState,
                talk_request_notification: payload.notification
            }
        default:
            return state
    }
}