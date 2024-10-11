import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  updateProductImage,
  deleteProductImage,
  getProductById,
} from "../thunk/index";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  isLoading: false,
  singleProduct: "",
  isError: "",
  count :0
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: [],
  extraReducers: ({ addCase }) => {
    addCase(createProduct.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data.unshift(payload.data);
      toast.success("Product Added");
    })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.data = payload.data;
        state.isLoading = false;
        state.count = payload.count
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.data = state.data.map((item) => {
          if (item._id === payload.data._id) return payload.data;
          return item;
        });
        state.isLoading = false;
        toast.success("Product Updated");
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductImage.fulfilled, (state, { payload }) => {
        state.data = state.data.map((item) => {
          if (item._id === payload.data._id) return payload.data;
          return item;
        });
        state.singleProduct = payload.data;
        state.isLoading = false;
        toast.success("Product Image Updated");
      })
      .addCase(updateProductImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductImage.fulfilled, (state, { payload }) => {
        state.singleProduct.productImages = payload.data.productImages;
        state.isLoading = false;
        toast.success("Product Image Deleted");
      })
      .addCase(deleteProductImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.data = [...state.data].filter(
          (item) => item._id !== payload.data._id
        );
        state.isLoading = false;
        toast.success("Product  Deleted");
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, { payload }) => {
        state.singleProduct = payload.data;
        state.isLoading = false;
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const selectProducts = (state) => state.products;
export const productSliceReducer = productSlice.reducer;
