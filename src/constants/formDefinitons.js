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

const productForm = [
  {
    name: "productTitle",
    label: "Product Title",
    type: "text",
    required: true,
  },
  {
    name: "productDescription",
    label: "Product Description",
    type: "text",
  },
  {
    name: "price",
    label: "Price",
    type: "text",
    required: true,
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "text",
    required: true,
    defaultValue: 0,
  },
  {
    name: "salePrice",
    label: "Sales Price",
    type: "text",
  },
  {
    name: "file",
    label: "Sales Price",
    type: "file",
    mimeType: "image/*",
    multiple: true,
  },
];


export const formsJSON = {
    categoryForm, productForm

}