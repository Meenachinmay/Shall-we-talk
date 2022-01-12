import {
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    ACCOUNT_ACTIVATION_FAILED,
    ACCOUNT_ACTIVATION_SUCCESS,
    USER_LOGGING_OUT
} from '../actions/types'

const initialState = {
    token: null,
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
                ...state = initialState,
                token: localStorage.getItem('token'),
                isAuth: true,
                loading: false,
                user: payload.user
            }
        case LOGIN_FAILED:
            localStorage.removeItem('token')
            return {
                ...state = initialState,
                error: payload.error.error,
                loading: false,
            }
        case USER_LOGGING_OUT:
            localStorage.removeItem('token')
            return {
                ...state = initialState,
            }
        case REGISTER_SUCCESS:
            return {
                ...state = initialState,
                loading: false,
                message: payload.message
            }
        case REGISTER_FAILED:
            return {
                ...state = initialState,
                loading: false,
                error: payload.error.error
            }
        case ACCOUNT_ACTIVATION_SUCCESS:
            return {
                ...state = initialState,
                loading: false,
                message: payload.message
            }
        case ACCOUNT_ACTIVATION_FAILED:
            return {
                ...state = initialState,
                isloading: false,
                error: payload.error
            }
        default:
            return state
    }
}