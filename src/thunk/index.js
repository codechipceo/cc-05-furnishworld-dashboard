import { createRequest } from "./apiRequest";
import { thunkWrapper } from "./thunkWrapper";
import { apiEndpoints } from "./apiEndpoints";

const { category, products, admin } = apiEndpoints;

//###########################################
//                   CATEGORY
//###########################################

export const createCategory = thunkWrapper(
  "category/create",
  async (payload) => {
 
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

export const updateCategoryImageFn = thunkWrapper(
  "cat/updateImg",
  async (payload) => {
    return await createRequest(category.updateImage, payload);
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
  "product/uploadImage",
  async (payload) => {
    return await createRequest(products.updateImage, payload);
  }
);

export const deleteProductImage = thunkWrapper(
  "product/deleteImage",
  async (payload) => {
    return await createRequest(products.delete, payload);
  }
);

export const deleteProduct = thunkWrapper("product/delete", async (payload) => {
  return await createRequest(products.delete, payload);
});

//###########################################
//                   ADMIN
//###########################################

export const login = thunkWrapper("admins/login", async (payload) => {
  return await createRequest(admin.login, payload);
});

export const createAdmin = thunkWrapper(
  "admins/createAdmin",
  async (payload) => {
    return await createRequest(admin.create, payload);
  }
);
