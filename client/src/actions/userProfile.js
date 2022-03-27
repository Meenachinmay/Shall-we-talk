import { 
    NEW_ALERT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS
} from '../actions/types'

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