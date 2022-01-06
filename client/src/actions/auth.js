import axios from 'axios'
import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_FAILED,
    REGISTER_SUCCESS
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
            payload: response.data.token
        })
    })
    .catch(error => {
        dispatch({
            type: LOGIN_FAILED,
            payload: error.response.data
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
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data.message
        })
    })
    .catch(error => {
        dispatch({
            type: REGISTER_FAILED,
            payload: error.response.data
        })
    })
}