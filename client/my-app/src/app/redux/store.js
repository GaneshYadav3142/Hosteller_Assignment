
import {  combineReducers, legacy_createStore } from 'redux';
import {reducer as cartReducer} from './reducer';

const rootReducer = combineReducers({
  cart:cartReducer,
});

const store = legacy_createStore(rootReducer);

export default store;
