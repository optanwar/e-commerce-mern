import { combineReducers } from 'redux';
import userReducer from './slice/userSlice';
import productReducer from './slice/productSlice';

const rootReducer = combineReducers({
  user: userReducer,
  products:productReducer, // Add more reducers here
});

export default rootReducer;
