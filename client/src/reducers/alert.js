import { 
    NEW_ALERT
} from '../actions/types'

const initialState = {
    newalert: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case NEW_ALERT:
            return {
                ...state = initialState,
                newalert: payload.alert
            }
        default:
            return state;
    }
}