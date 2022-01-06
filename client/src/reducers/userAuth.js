import {
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    LOGIN_FAILED,
    LOGIN_SUCCESS
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuth: null,
    loading: true,
    user: null,
    error: null,
    message: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuth: true,
                loading: true
            }
        case LOGIN_FAILED:
            localStorage.removeItem('token')
            return {
                ...state,
                ...payload,
                error: payload.error,
                isAuth: false,
                loading: false,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                message: payload.message
            }
        case REGISTER_FAILED:
            return {
                ...state,
                ...payload,
                loading: false,
                error: payload.error
            }
        default:
            return state
    }
}