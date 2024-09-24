import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { logout } from '../auth/userAuthSlice';
const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  user: {},
  getUserStatus: 'idle',
  updateUserStatus: 'idle',
};

export const getUser = createAsyncThunk(
  'userSlice/getUser',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${baseUrl}/profile`, {
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

export const updateUser = createAsyncThunk(
  'userSlice/updateUser',
  async (data, thunkAPI) => {
    console.log(data);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${baseUrl}/profile`, data, {
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.getUserStatus = 'idle';
      state.updateUserStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.getUserStatus = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.getUserStatus = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.getUserStatus = 'failed';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.updateUserStatus = 'loading';
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
        // state.emailTemplate = action.payload;
        state.updateUserStatus = 'succeeded';
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
        state.updateUserStatus = 'failed';
      });
    //   .addCase(getEmailTemplate.pending, (state) => {
    //     state.loading = true;
    //     state.getEmailTemplateStatus = 'loading';
    //   })
    //   .addCase(getEmailTemplate.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.emailTemplate = action.payload;
    //     state.getEmailTemplateStatus = 'succeeded';
    //   })
    //   .addCase(getEmailTemplate.rejected, (state) => {
    //     state.loading = false;
    //     state.getEmailTemplateStatus = 'failed';
    //   })

    //   .addCase(logout, (state) => {
    //     Object.assign(state, initialState);
    //   });
  },
});

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
