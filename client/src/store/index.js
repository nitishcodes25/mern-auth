import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import {persistReducer, persistStore} from 'redux-persist'
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({user: userReducer})

const persisConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persisConfig,rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)
