import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  updateCategoryImageFn,
} from "../thunk/index";

const initialState = {
  data: [],
  isError: "", // To handle error messages
  isLoading: false, // Loading state
  totalCount: 0,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: [],
  extraReducers: ({ addCase }) => {
    // Handle createCategory
    addCase(createCategory.fulfilled, (state, { payload }) => {
      state.data.unshift(payload.data); // Add new category to the beginning
      state.isLoading = false; // Loading complete
      state.isError = ""; // Clear any previous errors
    })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true; // Set loading to true while request is pending
      })
      .addCase(createCategory.rejected, (state, { error }) => {
        state.isLoading = false; // Loading complete
        state.isError = error.message; // Capture the error message
      });

    // Handle getAllCategories
    addCase(getAllCategories.fulfilled, (state, { payload }) => {
      state.data = payload.data; // Update state with fetched categories
      state.isLoading = false; // Loading complete
      state.isError = ""; // Clear any previous errors
      state.totalCount = payload.count;
    })
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true; // Set loading to true while request is pending
      })
      .addCase(getAllCategories.rejected, (state, { error }) => {
        state.isLoading = false; // Loading complete
        state.isError = error.message; // Capture the error message
      });

    // Handle updateCategory
    addCase(updateCategory.fulfilled, (state, { payload }) => {
      state.data = state.data.map((item) => {
        if (item._id === payload.data._id) return payload.data; // Update the category in the state
        return item;
      });
      state.isLoading = false; // Loading complete
      state.isError = ""; // Clear any previous errors
    })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true; // Set loading to true while request is pending
      })
      .addCase(updateCategory.rejected, (state, { error }) => {
        state.isLoading = false; // Loading complete
        state.isError = error.message; // Capture the error message
      });

    // Handle deleteCategory
    addCase(deleteCategory.fulfilled, (state, { payload }) => {
      state.data = state.data.filter(
        (item) => item._id !== payload.data._id // Remove the deleted category from the state
      );
      state.isLoading = false; // Loading complete
      state.isError = ""; // Clear any previous errors
    })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true; // Set loading to true while request is pending
      })
      .addCase(deleteCategory.rejected, (state, { error }) => {
        state.isLoading = false; // Loading complete
        state.isError = error.message; // Capture the error message
      });

    addCase(updateCategoryImageFn.fulfilled, (state, { payload }) => {
      state.data = state.data.map((eachCategory) => {
        if (eachCategory._id === payload.data?._id) {
          return payload.data;
        }
        return eachCategory;
      });

      state.isLoading = false;
    })
      .addCase(updateCategoryImageFn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategoryImageFn.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const selectCategory = (state) => state.category;
export const categorySliceReducer = categorySlice.reducer;
