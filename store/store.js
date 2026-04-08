import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "./uploadSlice";
import analysisReducer from "./analysisSlice";

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    analysis: analysisReducer,
  },
});