import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categorySliceReducer } from "./categorySlice";
import { productSliceReducer } from "./productSlice";

const reducers = combineReducers({
  category: categorySliceReducer,
  products: productSliceReducer,
});
export const store = configureStore({
  reducer: reducers,
});
