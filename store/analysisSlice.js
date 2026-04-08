import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const analyzeResume = createAsyncThunk(
  "analysis/analyzeResume",
  async ({ fileKey, jobDescription }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileKey, jobDescription }),
        }
      );

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const analysisSlice = createSlice({
  name: "analysis",
  initialState: {
    status: "idle",
    result: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(analyzeResume.pending, (state) => {
        state.status = "loading";
      })
      .addCase(analyzeResume.fulfilled, (state, action) => {
        state.status = "success";
        state.result = action.payload;
      })
      .addCase(analyzeResume.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default analysisSlice.reducer;