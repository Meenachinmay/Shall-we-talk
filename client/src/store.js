import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import alert from './reducers/alert'
import user from './reducers/user'

const reducers = combineReducers({
  alert,
  user
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
        reducers, 
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    )

export default store
