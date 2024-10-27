import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';

const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  receipts: [],
  receipt: {},
  getReceiptStatus: 'idle',
  addReceiptStatus: 'idle',
  updateReceiptStatus: 'idle',
  deleteReceiptStatus: 'idle',
};

// Fetch all receipts
export const getReceipts = createAsyncThunk(
  'receiptSlice/getReceipts',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${baseUrl}/receipts/`, {
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

// Add new receipt
export const addReceipt = createAsyncThunk(
  'receiptSlice/addReceipt',
  async (data, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${baseUrl}/receipts/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.message || error.toString()
      );
    }
  }
);

// Update receipt by ID
export const updateReceipt = createAsyncThunk(
  'receiptSlice/updateReceipt',
  async (updatedData, thunkAPI) => {
    const token = localStorage.getItem('token');
    const id = updatedData._id;
    try {
      const response = await axios.put(
        `${baseUrl}/receipts/${id}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.message || error.toString()
      );
    }
  }
);

// Delete receipt by ID
export const deleteReceipt = createAsyncThunk(
  'receiptSlice/deleteReceipt',
  async (id, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`${baseUrl}/receipts/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.message || error.toString()
      );
    }
  }
);

const receiptSlice = createSlice({
  name: 'receipts',
  initialState,
  reducers: {
    resetReceiptState: (state) => {
      state.loading = false;
      state.getReceiptStatus = 'idle';
      state.updateReceiptStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Receipts
      .addCase(getReceipts.pending, (state) => {
        state.loading = true;
        state.getReceiptStatus = 'loading';
      })
      .addCase(getReceipts.fulfilled, (state, action) => {
        state.loading = false;
        state.getReceiptStatus = 'succeeded';
        state.receipts = action.payload;
      })
      .addCase(getReceipts.rejected, (state) => {
        state.loading = false;
        state.getReceiptStatus = 'failed';
      })

      // Add Receipt
      .addCase(addReceipt.pending, (state) => {
        state.loading = true;
        state.addReceiptStatus = 'loading';
      })
      .addCase(addReceipt.fulfilled, (state, action) => {
        state.loading = false;
        state.addReceiptStatus = 'succeeded';
        state.receipts.push(action.payload);
      })
      .addCase(addReceipt.rejected, (state) => {
        state.loading = false;
        state.addReceiptStatus = 'failed';
      })

      // Update Receipt
      .addCase(updateReceipt.pending, (state) => {
        state.loading = true;
        state.updateReceiptStatus = 'loading';
      })
      .addCase(updateReceipt.fulfilled, (state, action) => {
        state.loading = false;
        state.updateReceiptStatus = 'succeeded';
        const index = state.receipts.findIndex(
          (receipt) => receipt._id === action.payload._id
        );
        if (index !== -1) {
          state.receipts[index] = action.payload;
        }
      })
      .addCase(updateReceipt.rejected, (state) => {
        state.loading = false;
        state.updateReceiptStatus = 'failed';
      })

      // Delete Receipt
      .addCase(deleteReceipt.pending, (state) => {
        state.loading = true;
        state.deleteReceiptStatus = 'loading';
      })
      .addCase(deleteReceipt.fulfilled, (state, action) => {
        state.loading = false;
        state.receipts = state.receipts.filter(
          (receipt) => receipt._id !== action.payload.deletedReceiptId
        );
        state.deleteReceiptStatus = 'succeeded';
      })
      .addCase(deleteReceipt.rejected, (state) => {
        state.loading = false;
        state.deleteReceiptStatus = 'failed';
      })

      // Handle logout
      .addCase(logout, (state) => {
        Object.assign(state, initialState);
      });
  },
});

export const { resetReceiptState } = receiptSlice.actions;

export default receiptSlice.reducer;
