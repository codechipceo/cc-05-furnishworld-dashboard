import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from "../thunk/index";

const initialState = {
  data: [],
  isError: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: [],
  extraReducers: ({ addCase }) => {
    addCase(createCategory.fulfilled, (state, { payload }) => {
      state.data.unshift(payload.data);
    })
     
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        state.data = payload.data;
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.data = state.data.map((item) => {
          if (item._id === payload.data._id) return payload.data;
          return item;
        });
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.data = [...state.data].filter(
          (item) => item._id !== payload.data._id
        );
      });
  },
});

export const selectCategory = (state) => state.category;
export const categorySliceReducer = categorySlice.reducer;
