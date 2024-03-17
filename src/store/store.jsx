import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer'
import artworkTypeReducer from './artworkTypeReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    currentUser: userReducer,
    artworkType: artworkTypeReducer,
});

const store = createStore(rootReducer);

export default store;