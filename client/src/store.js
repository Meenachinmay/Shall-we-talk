import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import alert from './reducers/alert'
import user from './reducers/user'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const reducers = combineReducers({
  alert,
  user
})

const persistedReducer = persistReducer(persistConfig, reducers)

const initialState = {}

const middleware = [thunk]

const store = createStore(
        persistedReducer, 
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    )
const persistor = persistStore(store)

export { store, persistor }
