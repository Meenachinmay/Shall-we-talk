import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initialState = {}

const middleware = [thunk]

const store = createStore(
        persistedReducer, 
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    )

const persistor = persistStore(store)

export { store, persistor }
