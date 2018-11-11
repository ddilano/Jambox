
import spotifyReducer from './spotify';
import {createLogger} from 'redux-logger'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const reducer = combineReducers({spotifyReducer});

let middleware = [ thunkMiddleware]

const store = createStore(reducer, applyMiddleware(...middleware, createLogger({ collapsed: true })));

export default store;
export * from './spotify';
