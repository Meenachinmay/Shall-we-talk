import {
    NEW_ALERT
} from './types'

export const setNewAlert = (newalert) => async dispatch => {
    dispatch({
        type: NEW_ALERT,
        payload: {
            alert: newalert
        }
    })
}