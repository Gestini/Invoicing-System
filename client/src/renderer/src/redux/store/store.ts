// store.ts

import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../reducers/authReducers'; // Asegúrate de importar tu reducer aquí

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Puedes agregar otros reducers aquí si tienes más slices
  },
});

export default store;