const categoryForm = [
  {
    name: "categoryImage",
    label: "Category Icon",
    type: "file", // assuming file upload for images
  },
  {
    name: "categoryTitle",
    label: "Category Title",
    type: "text",
  },
];

const productForm1 = [
  {
    name: "productTitle",
    label: "Product Title",
    type: "text",
    required: true,
  },

  {
    name: "price",
    label: "Price",
    type: "text",
    required: true,
  },

  {
    name: "salePrice",
    label: "Sales Price",
    type: "text",
  },
];

const productForm2 = [
  {
    name: "quantity",
    label: "Quantity",
    type: "text",
    required: true,
    defaultValue: 0,
  },
  {
    name: "saleStatus",
    label: "Sale Status",
    type: "select",
    options: [
      { _id: "newArrived", saleStatus: "New Arrivals" },
      { _id: "bestSellers", saleStatus: "Best Sellers" },
      { _id: "saleItems", saleStatus: "Sale Items" },
    ],
    displayKey: "saleStatus",
  },
  {
    name: "productDescription",
    label: "Product Description",
    type: "text",
    rows: 6,
  },
  {
    name: "file",
    label: "Upload Image",
    type: "file",
    mimeType: "image/*",
    multiple: true,
  },
];

export const formsJSON = {
  categoryForm,
  productForm1,
  productForm2,
};
