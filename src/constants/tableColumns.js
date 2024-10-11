const categoryColumns = [
  { field: "categoryTitle", headerName: "Category Name", flex: 1 },
];


const productColumns = [
  { field: "productTitle", headerName: "Product Title", flex: 1 },
  { field: "price", headerName: "Price", flex: 1 },
  { field: "quantity", headerName: "Quantity", flex: 1 },
  {
    field: "categoryId",
    headerName: "Category ID",
    flex: 1,
    valueGetter: (params) => {
      const categoryArr = params?.map((each) => each.categoryTitle)
      return categoryArr.join(", ");
    }
  }, // This is an array; you might want to handle this differently in your table.
  { field: "salePrice", headerName: "Sale Price", flex: 1 },
];

export const tableColumns = { categoryColumns, productColumns };
