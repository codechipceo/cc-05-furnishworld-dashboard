const category = {
  create: "category/create",
  getAll: "category/getall",
  getbyid: "category/getbyid",
  update: "category/update",
  delete: "category/delete",
  updateImage: "category/updateImage",
};

const products = {
  create: "product/create",
  createMany: "product/createMany",
  getAll: "product/getAll",
  getById: "product/getById",
  update: "product/update",
  delete: "product/deleteProductImage",
  upload: "product/",
  updateImage: "product/updateImage",
};

const admin = {
  login: "user/signIn",
  create: "admin/create",
};

export const apiEndpoints = {
  category,
  products,
  admin,
};
