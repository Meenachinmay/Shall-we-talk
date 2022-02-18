import {
    UPDATE_USER
} from '../actions/types'

const initialState = {
    user: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case UPDATE_USER:
            return {
                ...state = initialState,
                user: payload.user
            }
        default:
            return state
    }
}