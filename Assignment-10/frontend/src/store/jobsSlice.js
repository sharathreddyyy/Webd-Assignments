import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/jobs");
      return response.data.jobs || [];
    } catch (err) {
      return rejectWithValue("Failed to load jobs");
    }
  }
);

export const addJob = createAsyncThunk(
  "jobs/addJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await api.post("/create/job", jobData);
      return response.data.job;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to add job"
      );
    }
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(addJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobsSlice.reducer;