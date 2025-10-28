import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_BASE = process.env.REACT_APP_API_BASE;

if (!API_BASE) {
  console.error('REACT_APP_API_BASE is missing! Check your .env file.');
}

const API_URL = `${API_BASE}/jobs`;


export const fetchJobs = createAsyncThunk(
  'jobs/fetchAll', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
    
      const data = response.data.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch jobs';
      return rejectWithValue(message);
    }
  }
);

// === Slice ===
const careersSlice = createSlice({
  name: 'careers',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {
   
    clearJobs: (state) => {
      state.jobs = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload; 
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearJobs } = careersSlice.actions;
export default careersSlice.reducer;