import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('userData', userData);
      console.log('registering user');
      const response = await axios.post(
        `${baseUrl}/users/register/`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/users/login/`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('login response', response.data);
      return response.data;
    } catch (error) {
      console.log('login error', error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createAdmin = createAsyncThunk(
  'user/createAdmin',
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${baseUrl}/admin/create_admin`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: {
    data: null,
    token: localStorage.getItem('token') || '',
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    registerError: null,
    loginError: null,
    createAdminError: null,
  },
  reducers: {
    logout: (state) => {
      state.data = null;
      state.token = '';
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    resetData: (state) => {
      state.data = null;
      state.createAdminError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registerError = action.payload;
      })
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
        state.createAdminError = null;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.createAdminError = action.payload;
      });
  },
});

export const { logout, resetData } = userAuthSlice.actions;

export default userAuthSlice.reducer;
