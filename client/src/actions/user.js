import { 
    HIDE_ALERT,
    NEW_ALERT, 
    USER_PROFILE_FAIL, 
    USER_PROFILE_REQUEST, 
    USER_PROFILE_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL
} from './types'

import axios from 'axios'
import { setNewAlert } from './alert'

export const fetchUserProfile = (userID) => async (dispatch) => {
    dispatch({ type: USER_PROFILE_REQUEST })
    axios({
            method: 'POST',
            url: 'http://localhost:8000/apiV1/load-user',
            data: { userID }
    })
    .then(response => {
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: {
                userProfile: response.data.userProfile
            }
        })
        const newalert = {
            type: 'info',
            message: 'User profile loaded!'
        }
        dispatch({
            type:NEW_ALERT,
            payload: {
                alert: newalert
            }
        })
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);
    })
    .catch(error => {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: {
                error: error.response.data
            }
        })
        const newalert = {
            type: 'danger',
            message: error.response.data
        }
        dispatch({
            type:NEW_ALERT,
            payload: {
                alert: newalert
            }``
        })
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);
    })
}


// Login action - login a user
// this login action will make a post req to backend and fethcs data from backend
export const userLogin = ( email, password ) => async dispatch => {
    dispatch({ type: USER_LOGIN_REQUEST })

    axios({
        method: 'POST',
        url: `http://localhost:8000/apiV1/login-user`,
        data: { email, password }
    })
    .then(response => {
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: {
                token: response.data.token,
                user: response.data.user,
            }
        })

        localStorage.setItem('token', response.data.token)

        const newalert = {
            type: 'info',
            message: 'You are logged-in successfully!'
        }
        dispatch({
            type:NEW_ALERT,
            payload: {
                alert: newalert
            }
        })
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);

    })
    .catch(error => {
        const newalert = {
            type: 'danger',
            message: error.response.data.message
        }

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: {
                error: error.response.data
            }
        })

        dispatch(setNewAlert(newalert))
    })
}

// Register action - Register a user
// this regiter action will make a post req to backend and fethcs data from backend
export const userRegister = ( email, password, confirmPassword ) => async dispatch => {
    dispatch({ type: USER_LOGIN_REQUEST })

    axios({
        method: 'POST',
        url: `http://localhost:8000/apiV1/login-user`,
        data: { email, password }
    })
    .then(response => {
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: {
                token: response.data.token,
                user: response.data.userProfile,
            }
        })

        localStorage.setItem('token', response.data.token)

        const newalert = {
            type: 'info',
            message: 'You are logged-in successfully!'
        }
        dispatch({
            type:NEW_ALERT,
            payload: {
                alert: newalert
            }
        })
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);

    })
    .catch(error => {
        const newalert = {
            type: 'danger',
            message: error.response.data.message
        }
        dispatch(setNewAlert(newalert))

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: {
                error: error.response.data
            }
        })
    })
}

export const userLogout = ({ navigate }) => async dispatch => {
    localStorage.removeItem('token')
    dispatch({ type: USER_LOGOUT_REQUEST })
    navigate('/login-register')
}