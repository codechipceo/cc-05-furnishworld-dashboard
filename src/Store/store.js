import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categorySliceReducer } from "./categorySlice";
import { productSliceReducer } from "./productSlice";
import { adminReducer } from "./adminSlice";
const reducers = combineReducers({
  category: categorySliceReducer,
  products: productSliceReducer,
  admin: adminReducer,
});
export const store = configureStore({
  reducer: reducers,
});
