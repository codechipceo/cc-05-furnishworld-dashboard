import { useTools } from "../../Hooks/useTools";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormComponent } from "../../Components/FormComponent/FormComponent";
import { payloads, formsJSON, tableColumns } from "../../constants/index";

import { HeaderBar, Wrapper } from "../../Components/Wrapperr";
import { hasData } from "../../util/util";
import DataTable from "../../Components/DataTable/DataTable";
import { createProduct, getAllCategories, getAllProducts } from "../../thunk";
import { selectCategory } from "../../Store/categorySlice";
import Checkbox from "@mui/material/Checkbox";
import { selectProducts } from "../../Store/productSlice";

const { productForm } = formsJSON;
const { productPayload } = payloads;
const { productColumns } = tableColumns;
export const Products = () => {
  /*
  ########################################################################
          STATES
  ########################################################################
 */
  const { dispatch, useSelector } = useTools();
  const [paginationMode, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [isForm, setForm] = useState(false);
  const [status, setStatus] = useState("CREATE");
  const [pageData, setPageData] = useState({ ...productPayload });

  const [checkedCategory, setCheckedCategory] = useState([]);

  const [productImages, setProductImages] = useState([]);

  //redux data
  const { data: categoryData, isError } = useSelector(selectCategory);
  const { data :  productData , isError: productError} = useSelector(selectProducts)

  /*
  ########################################################################
          HANDLER FUNCTIONS
  ########################################################################
 */

  const isChecked = (id, arr) => {
    return Array.isArray(arr) && arr.includes(id);
  };

  const checkCategory = (id) => {
    const categoryArr = [...checkedCategory];
    if (categoryArr.includes(id)) {
      setCheckedCategory(categoryArr.filter((item) => item !== id));
    } else {
      setCheckedCategory([...categoryArr, id]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const data = { ...pageData };
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setProductImages(files);
    } else {
      data[name] = value;
    }
    setPageData(data);
  };

  const handleActive = (document) => {
    const { _id, isActive } = document;
    const payload = {
      productId: _id,
      isActive: !isActive,
    };
    // dispatch(updateCategory(payload));
  };
  const handleEdit = (row) => {
    const data = { ...row };
    data.productId = data._id;
    const ids = data.categoryId.map((item) => item._id);
    setCheckedCategory(ids);

    setPageData(data);
    setStatus("EDIT");
    setForm(true);
  };

  const handleCancel = () => {
    setForm(false);
    setPageData(productPayload);
    setStatus("CREATE");
    setCheckedCategory([]);
    setProductImages([])
  };
  const handleDelete = (id) => {
    const payload = {
      productId: id,
      isDelete: true,
    };
  };

  const formData = new FormData();
  const handleSubmit = () => {
    if (status === 'CREATE') {

      Object.keys(pageData).map((key) => {
        formData.append(key, pageData[key]);
      });

      checkedCategory.map((category) => formData.append("categoryId", category))
      productImages.map((eachImage) => {

        formData.append("productImages", eachImage);
      })

      dispatch(createProduct(formData));
    } else if (status === 'EDIT') {
      console.log(pageData)
      console.log(checkedCategory)
      console.log(productImages)
    }

  };

  /*
  ########################################################################
          USE EFFECT
  ########################################################################
 */

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProducts())
  }, []);

  /*
  ########################################################################
         CHILDREN
  ########################################################################
 */
  const categoryIds = categoryData.map((eachCategory) => {
    return (
      <>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Checkbox
            key={eachCategory._id}
            checked={isChecked(eachCategory._id, checkedCategory)}
            onChange={() => checkCategory(eachCategory._id)}
          />
          <Typography>{eachCategory.categoryTitle}</Typography>
        </Box>
      </>
    );
  });

  return (
    <>
      <HeaderBar title={"Products"} />
      {isForm === false ? (
        <>
          <Wrapper>
            <Box mb={4}>
              <Button variant='contained' onClick={() => setForm(true)}>
                Add New Product +
              </Button>
            </Box>
            {hasData(productData) ? (
              <DataTable
                rows={productData}
                handleActive={handleActive}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                columns={productColumns}
                totalCount={0}
                paginationModel={paginationMode}
                setPaginationModel={setPaginationModel}
              />
            ) : (
              <Box>
                <Typography>No Data Exist</Typography>
              </Box>
            )}
          </Wrapper>
        </>
      ) : (
        <Wrapper>
          <FormComponent
            formDefinition={productForm}
            formPayload={pageData}
            status={status}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onCancel={handleCancel}
          >
            <Box display={"flex"} gap={1} flexWrap={"wrap"}>
              {productImages &&
                productImages.map((selectedImage, i) => {
                  return (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      height={"80px"}
                      width={"80px"}
                      alt=''
                      key={i}
                    />
                  );
                })}
            </Box>
            <Typography>Select Categories</Typography>
            <Box display={"flex"} gap={2} flexWrap={"wrap"}>
              {categoryIds}
            </Box>
          </FormComponent>
        </Wrapper>
      )}
    </>
  );
};
