// thunkWrapper.js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const thunkWrapper = (typePrefix, asyncFunction) => {
  return createAsyncThunk(typePrefix, async (args, thunkAPI) => {
    try {
      return await asyncFunction(args);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  });
};
