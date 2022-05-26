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
    USER_LOGOUT_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    ACCOUNT_ACTIVATION_REQUEST,
    ACCOUNT_ACTIVATION_SUCCESS,
    ACCOUNT_ACTIVATION_FAIL,
    NEW_PROFILE_CREATION_REQUEST,
    NEW_PROFILE_CREATION_FAIL,
    NEW_PROFILE_CREATION_SUCCESS
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
                error: error.response.data.message
            }
        })

        dispatch(setNewAlert(newalert))
    })
}

// Register action - Register a user
// this regiter action will make a post req to backend and fethcs data from backend
export const userRegister = ( name, email, password ) => async dispatch => {
    dispatch({ type: USER_REGISTER_REQUEST })

    axios({
        method: 'POST',
        url: `http://localhost:8000/apiV1/create-new-user`,
        data: { name, email, password }
    })
    .then(response => {
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: response.data.message
        })

        const newalert = {
            type: 'info',
            message: response.data.message
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
            type: USER_REGISTER_FAIL,
            payload: {
                error: error.response.data.message
            }
        })

        dispatch(setNewAlert(newalert))
    })
}

// logout the user and delete localstorage
export const userLogout = ({ navigate }) => async dispatch => {
    localStorage.removeItem('token')
    dispatch({ type: USER_LOGOUT_REQUEST })
    navigate('/login-register')
}

//
export const accountActivate = (auth_token,navigate) => async dispatch => {
    dispatch({ type: ACCOUNT_ACTIVATION_REQUEST})
    
    axios({
        method: 'POST',
        url: 'http://localhost:8000/apiV1/account-activation',
        data: { auth_token }
    }).then(response => {
        dispatch({ type: ACCOUNT_ACTIVATION_SUCCESS, payload: response.data.message })
        navigate('/login-register')

    }).catch(error => {
        dispatch({
            type: ACCOUNT_ACTIVATION_FAIL,
            payload: {
                error: error.response.data.message
            }
        })

        const newalert = {
            type: 'danger',
            message: error.response.data.message
        }

        dispatch(setNewAlert(newalert))
    })
}


// create a new user profile
export const createNewUserProfile = ({ userID, newProfileData }) => async dispatch => {
    dispatch({ type: NEW_PROFILE_CREATION_REQUEST })

    axios({
        method: 'POST',
        url: `http://localhost:8000/apiV1/create-user-profile`,
        headers: { authorization: localStorage.getItem('token')},
        data: { userID: userID, profileData: newProfileData }
    })
    .then(response => {
        dispatch({ 
            type: NEW_PROFILE_CREATION_SUCCESS, 
            payload: response.data.userProfile
        })

        const newalert = {
            type: 'info',
            message: response.data.message
        }

        dispatch(setNewAlert(newalert))
    })
    .catch(error => {
        dispatch({
            type: NEW_PROFILE_CREATION_FAIL,
            payload: {
                error: error.response.data.message
            }
        })

        const newalert = {
            type: 'danger',
            message: error.response.data.message
        }

        dispatch(setNewAlert(newalert))
    })
}


// update the user profile
export const updateUserProfile = ({ userID }) => async dispatch => {

}

