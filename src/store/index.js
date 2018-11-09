import searchReducer from './search';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const reducer = combineReducers({searchResults: searchReducer});

let middleware = [ thunkMiddleware]

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
export * from './search';
