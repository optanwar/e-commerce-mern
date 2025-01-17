// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import productReducer from './featuresSlice/productSlice';
import userReducer from './featuresSlice/userSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ 
  user: userReducer, 
  products: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
