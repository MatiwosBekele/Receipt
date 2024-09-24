import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';
// import { logout } from '../auth/userAuthSlice';
const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  products: [],
  product: {},
  getProductStatus: 'idle',
  addProductStatus: 'idle',
  updateProductStatus: 'idle',
  deleteProductStatus: 'idle',
};

export const getProducts = createAsyncThunk(
  'productSlice/getProducts',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${baseUrl}/products/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.message || error.toString()
      );
    }
  }
);
export const addProduct = createAsyncThunk(
  'productSlice/addProduct',
  async (data, thunkAPI) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${baseUrl}/products/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.message || error.toString()
      );
    }
  }
);
export const updateProduct = createAsyncThunk(
  'productSlice/updateProduct',
  async (updatedData, thunkAPI) => {
    const token = localStorage.getItem('token');
    const id = updatedData._id;
    try {
      const response = await axios.put(
        `${baseUrl}/products/${id}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.message || error.toString()
      );
    }
  }
);
export const deleteProduct = createAsyncThunk(
  'productSlice/deleteProduct',
  async (id, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`${baseUrl}/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.message || error.toString()
      );
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.getProductStatus = 'idle';
      state.updateProductStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.getProductStatus = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.getProductStatus = 'succeeded';
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.getProductStatus = 'failed';
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.updateProductStatus = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.updateProductStatus = 'succeeded';
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state) => {
        state.loading = false;
        state.updateProductStatus = 'failed';
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.addProductStatus = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.addProductStatus = 'succeeded';
        state.products.push(action.payload.product);
      })
      .addCase(addProduct.rejected, (state) => {
        state.loading = false;
        state.addProductStatus = 'failed';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.deleteProductStatus = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.deletedProduct._id
        );
        state.deleteProductStatus = 'succeeded';
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
        state.deleteProductStatus = 'failed';
      })
      .addCase(logout, (state) => {
        Object.assign(state, initialState);
      });
  },
});

export const { resetProductState } = productSlice.actions;

export default productSlice.reducer;
