import axios from 'axios'
import {
    UPDATE_USER
} from './types'

export const updateUser = (user) => async dispatch => {
    axios({
        method: 'POST',
        url: `http://localhost:8000/apiV1/load-user`,
        data: { user }
    }).then (response => {
        dispatch({
            type: UPDATE_USER,
            payload: {
                user: response.data.user
            }
        })
    }).catch(error => {
        console.log(error.response.data)
    })
}