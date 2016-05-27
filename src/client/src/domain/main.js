import { combineReducers } from 'redux';
import {searchReducer} from './search';
import { routerReducer } from 'react-router-redux';

export const rootReducer = combineReducers({
    search: searchReducer,
    routing: routerReducer
})
