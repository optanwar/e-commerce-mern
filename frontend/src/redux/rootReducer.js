import { combineReducers } from 'redux';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  user: userReducer, // Add more reducers here
});

export default rootReducer;
