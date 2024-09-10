import { createRequest } from "./apiRequest";
import { thunkWrapper } from "./thunkWrapper";
import { apiEndpoints } from "./apiEndpoints";

const { category, products } = apiEndpoints;

//###########################################
//                   CATEGORY
//###########################################

export const createCategory = thunkWrapper(
  "category/create",
  async (payload) => {
    console.log("Inside redux");
    return await createRequest(category.create, payload);
  }
);

export const getAllCategories = thunkWrapper(
  "category/getAll",
  async (payload) => {
    return await createRequest(category.getAll, payload);
  }
);

export const getCategoryById = thunkWrapper(
  "category/getById",
  async (payload) => {
    return await createRequest(category.getbyid, payload);
  }
);

export const updateCategory = thunkWrapper(
  "category/update",
  async (payload) => {
    return await createRequest(category.update, payload);
  }
);

export const deleteCategory = thunkWrapper(
  "category/delete",
  async (payload) => {
    return await createRequest(category.delete, payload);
  }
);

//###########################################
//                   PRODUCTS
//###########################################

export const createProduct = thunkWrapper("product/create", async (payload) => {
  return await createRequest(products.create, payload);
});

export const createManyProducts = thunkWrapper(
  "product/createMany",
  async (payload) => {
    return await createRequest(products.createMany, payload);
  }
);

export const getAllProducts = thunkWrapper(
  "product/getAll",
  async (payload) => {
    return await createRequest(products.getAll, payload);
  }
);

export const getProductById = thunkWrapper(
  "product/getById",
  async (payload) => {
    return await createRequest(products.getById, payload);
  }
);

export const updateProduct = thunkWrapper("product/update", async (payload) => {
  return await createRequest(products.update, payload);
});

export const updateProductImage = thunkWrapper(
  "product/upload",
  async (payload) => {
    return await createRequest(products.upload, payload);
  }
);

export const deleteProduct = thunkWrapper("product/delete", async (payload) => {
  return await createRequest(products.delete, payload);
});
