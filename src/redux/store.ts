import thunk from 'redux-thunk';
import {rootReducer} from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['common']
}

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

const persistor = persistStore(store);

export { store, persistor };

export type AppDispatch = typeof store.dispatch;