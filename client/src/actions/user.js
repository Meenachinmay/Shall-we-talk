import { 
    HIDE_ALERT,
    NEW_ALERT, 
    USER_PROFILE_FAIL, 
    USER_PROFILE_REQUEST, 
    USER_PROFILE_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL
} from './types'

import axios from 'axios'

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
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: {
                error: error.response.data
            }
        })
    })
}