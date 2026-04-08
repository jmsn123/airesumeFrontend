import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const uploadResume = createAsyncThunk(
  "upload/uploadResume",
  async (file) => {
    // 1. Get presigned URL
    const res = await fetch("YOUR_API_URL/upload");
    const { uploadUrl, fileKey } = await res.json();

    // 2. Upload file to S3
    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    return { fileKey };
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    status: "idle",
    fileKey: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadResume.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.status = "success";
        state.fileKey = action.payload.fileKey;
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default uploadSlice.reducer;