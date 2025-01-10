import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk'; // Correct import

import rootReducer from './rootReducer'; // Adjust the path if needed

// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore persist actions
        ignoredPaths: ['register'], // Add any specific non-serializable paths
      },
      
    }).concat(thunk),
});

// Persistor
const persistor = persistStore(store);

export { store, persistor };
