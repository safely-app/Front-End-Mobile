import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['common']
}

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(thunk),
));

const persistor = persistStore(store);

export { store, persistor };