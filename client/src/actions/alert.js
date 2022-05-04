import {
    HIDE_ALERT,
    NEW_ALERT,
} from './types'

export const setNewAlert = (newalert) => async dispatch => {
    dispatch({
        type: NEW_ALERT,
        payload: {
            alert: newalert
        }
    })

    setTimeout(() => {
        dispatch({
            type: HIDE_ALERT
        })
    }, 3000);
}

