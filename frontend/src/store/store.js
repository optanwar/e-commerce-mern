import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage by default

import productReducer from '../slices/productSlice';


// Persist config: Persist both 'user' and 'cart' slices
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart',"products"], // Persist both 'user' and 'cart' slices
};

// Combine all reducers
const rootReducer = combineReducers({
  
  products: productReducer, // Product state is NOT persisted

});

// Apply persistReducer to root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevent errors from redux-persist
    }),
});

// Persistor for persisting the store
const persistor = persistStore(store);

export { store, persistor };
