import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  updateProductImage,
  deleteProductImage,
} from "../thunk/index";

const initialState = {
  data: [],
  isError: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: [],
  extraReducers: ({ addCase }) => {
    addCase(createProduct.fulfilled, (state, { payload }) => {
      state.data.unshift(payload.data);
    })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.data = payload.data;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.data = state.data.map((item) => {
          if (item._id === payload.data._id) return payload.data;
          return item;
        });
      })
      .addCase(updateProductImage.fulfilled, (state, { payload }) => {
        state.data = state.data.map((item) => {
          if (item._id === payload.data._id) return payload.data;
          return item;
        });
      })
      .addCase(deleteProductImage.fulfilled, (state, { payload }) => {
        state.data = state.data.map((item) => {
          if (item._id === payload.data._id) return payload.data;
          return item;
        });
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.data = [...state.data].filter(
          (item) => item._id !== payload.data._id
        );
      });
  },
});

export const selectProducts = (state) => state.products;
export const productSliceReducer = productSlice.reducer;
