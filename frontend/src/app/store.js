import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../state/productsSlice';
import userReducer from '../state/userSlice';
import userAuthReducer from '../state/authSlice';
import receiptReducer from '../state/receiptSlice';
const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    userAuth: userAuthReducer,
    receipt: receiptReducer,
  },
});

export default store;
