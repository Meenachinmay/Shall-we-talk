import { 
    ACCOUNT_ACTIVATION_FAIL,
    ACCOUNT_ACTIVATION_REQUEST,
    ACCOUNT_ACTIVATION_SUCCESS,
    NEW_ALERT, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS
} from '../actions/types'

const initialState = {
    user: {},
    login: false,
    logout: true,
    loading: false
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case USER_PROFILE_REQUEST:
            return {
                ...state = initialState,
                user: {},
                loading: true
            }
        case USER_PROFILE_SUCCESS:
            return {
                ...state = initialState,
                user: payload.userProfile,
                loading: false,
            }
        case USER_PROFILE_FAIL:
            return {
                ...state = initialState,
                user: {},
                loading: false,
                error: payload.error
            }
        case USER_LOGIN_REQUEST:
            return {
                ...state = initialState,
                user: {},
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state = initialState,
                user: payload.user,
                loading: false,
                login: true,
                logout: false
            }
        case USER_LOGIN_FAIL:
            return {
                ...state = initialState,
                user: {},
                loading: false,
                login: false,
                logout: true,
                error: payload.error
            }
        case USER_LOGOUT_REQUEST:
            return {
                ...state = initialState,
                user: {},
                login: false,
                logout: true
            }
        case USER_REGISTER_REQUEST:
            return {
                ...state = initialState,
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state = initialState,
                loading: false,
                message: payload.message
            }
        case USER_REGISTER_FAIL:
            return {
                ...state = initialState,
                loading: false,
                error: payload.error
            }
        case ACCOUNT_ACTIVATION_REQUEST:
            return {
                ...state = initialState,
                loading: true,
            }
        case ACCOUNT_ACTIVATION_SUCCESS:
            return {
                ...state = initialState,
                loading: false,
                message: payload.message
            }
        case ACCOUNT_ACTIVATION_FAIL:
            return {
                ...state = initialState,
                loading: false,
                error: payload.error
            }
        default:
            return state;
    }
}