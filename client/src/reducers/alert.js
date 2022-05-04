import { 
    HIDE_ALERT,
    NEW_ALERT
} from '../actions/types'

const initialState = {
    newalert: {},
    showAlert: false
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case NEW_ALERT:
            return {
                ...state = initialState,
                newalert: payload.alert,
                showAlert: true
            }
        case HIDE_ALERT:
            return {
                ...state = initialState,
                newalert:{},
                showAlert: false
            }
        default:
            return state;
    }
}