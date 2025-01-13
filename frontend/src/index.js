import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the correct import for React 18
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import App from './App';
import './App.css'

// Get the root DOM element
const rootElement = document.getElementById('root');

// Create a root using ReactDOM.createRoot
const root = ReactDOM.createRoot(rootElement);

// Render the application
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
     

        <App />
      
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
