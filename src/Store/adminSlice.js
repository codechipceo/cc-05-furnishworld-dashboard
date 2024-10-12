import { createSlice } from "@reduxjs/toolkit";
import { login, createAdmin } from "../thunk"; // Adjust the import path as needed

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    token: localStorage.getItem("adminToken"),
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = "";
      localStorage.removeItem("adminToken");
    },
    // You can add additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data?.token;
        localStorage.setItem("adminToken", action.payload.data?.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const adminState = (state) => state.admin;
export const { logout } = adminSlice.actions;
export const { reducer: adminReducer } = adminSlice;
