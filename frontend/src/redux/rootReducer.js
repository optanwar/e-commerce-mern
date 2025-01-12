import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productReducer } from './slice/productSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['product'], // Add slices you want to persist
};

const rootReducer = combineReducers({
  product: productReducer,
});

export default persistReducer(persistConfig, rootReducer);
