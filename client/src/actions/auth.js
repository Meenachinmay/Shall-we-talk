import axios from 'axios'
import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    ACCOUNT_ACTIVATION_SUCCESS,
    ACCOUNT_ACTIVATION_FAILED,
    USER_LOGGING_OUT,
    USER_LOGGING_OUT_FAILED,
    CHANGING_USER_STATUS,
    CHANGING_USER_STATUS_FAILED,
    SET_USER_STATUS
} from './types'

// Login action - login a user
// this login action will make a post req to backend and fethcs data from backend
export const login = ({ email, password }) => async dispatch => {
    axios({
        method: 'POST',
        url: `http://localhost:8000/apiV1/login-user`,
        data: { email, password }
    })
    .then(response => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: response.data.token,
                user: response.data.user
            }
        })
    })
    .catch(error => {
        dispatch({
            type: LOGIN_FAILED,
            payload: {
                error: error.response.data
            }
        })
    })
}

//Register action - register a user and send an email for activation, this action will get launched when user will complete the register process via email
export const register = ({username, email, password }) => async dispatch => {
    axios({
        method: 'POST',
        url: `http://localhost:8000/apiV1/create-new-user`,
        data: { username, email, password }
    })
    .then(response => {
        console.log("response -> ", response.data.message)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                message: response.data.message
            }
        })
    })
    .catch(error => {
        dispatch({
            type: REGISTER_FAILED,
            payload: {
                error: error.response.data
            }
        })
    })
}


// an action which will fire a request to backend with access token got from the URL in order to save your details to backend
export const accountActivation = ({ token }) => async dispatch => {
    axios({
            method: 'POST',
            url: `http://localhost:8000/apiV1/account-activation`,
            data: { token }
        })
        .then(response => {
            dispatch({
                type: ACCOUNT_ACTIVATION_SUCCESS,
                payload: {
                    message: response.data.message
                }
            })
        })
        .catch(error => {
            dispatch({
                type: ACCOUNT_ACTIVATION_FAILED,
                payload: {
                    error: error.response.data
                }
            })
        })
}


// an action to logout the user and delete the token from localStorage and user from the redux state, this will also reset the redux auth state to initial state
export const logout = ({user}) => async dispatch => {
    const token = localStorage.getItem('token')
    axios({
        method: 'DELETE',
        url: `http://localhost:8000/apiV1/logout-user`,
        data: { user, token }
    })
    .then(response => {
        dispatch({
            type: USER_LOGGING_OUT,
            payload: {
                message: response.data.message
            }
        })
    })
    .catch(error => {
        dispatch({
            type: USER_LOGGING_OUT_FAILED,
            payload: {
                error: error.response.data
            }
        })
    })
}



// changing user status in redux store
export const changeUserStatus = ({user, status, token}) => async dispatch => {
    axios({
        method: 'POST',
        url: `http://localhost:8000/apiV1/change-status`,
        data: { token, user, status }
      })
      .then(response => {
          dispatch({
              type: CHANGING_USER_STATUS,
              payload: {
                  status: response.data.status
              }
          })
      })
      .catch(error => {
        dispatch({
            type: CHANGING_USER_STATUS_FAILED,
            payload: {
                error: error.response.data
            }
        })
      })
}


// set current user status when a use logged in
export const setUserStatus = (status) => async dispatch => {
    dispatch({
        type: SET_USER_STATUS,
        payload: status
    })
}