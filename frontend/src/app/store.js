import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../state/productsSlice';
import userReducer from '../state/userSlice';
import userAuthReducer from '../state/authSlice';
const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    userAuth: userAuthReducer,
  },
});

export default store;
