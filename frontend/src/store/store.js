import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can change to sessionStorage if preferred
import productReducer from '../slices/productSlice';


const persistConfig = {
  key: 'root',
  storage,
};

const persistedProductReducer = persistReducer(persistConfig, productReducer);

const store = configureStore({
  reducer: {

    products: persistedProductReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };