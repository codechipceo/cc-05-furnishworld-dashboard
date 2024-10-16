import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormComponent } from "../../Components/FormComponent/FormComponent";
import { formsJSON, payloads, tableColumns } from "../../constants/index";
import { useTools } from "../../Hooks/useTools";

import DataTable from "../../Components/DataTable/DataTable";
import { HeaderBar, Wrapper } from "../../Components/Wrapperr";
import { hasData } from "../../util/util";

import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../Components/Loader/Loader";
import { selectCategory } from "../../Store/categorySlice";
import { selectProducts } from "../../Store/productSlice";
import {
  createProduct,
  deleteProduct,
  deleteProductImage,
  getAllCategories,
  getAllProducts,
  updateProduct,
  updateProductImage,
} from "../../thunk";
import ImageViewer from "./ImageUpload/ImageViewer";

const { productForm1, productForm2 } = formsJSON;
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
    pageSize: 10,
  });
  const [isForm, setForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState("CREATE");
  const [pageData, setPageData] = useState({ ...productPayload });

  const [checkedCategory, setCheckedCategory] = useState([]);

  const [productImages, setProductImages] = useState([]);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  //redux data
  const { data: categoryData, isError } = useSelector(selectCategory);
  const {
    data: productData,
    count: productCount,
    isError: productError,
    isLoading: productLoading,
  } = useSelector(selectProducts);

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

  const handleChange = (e, imageId = null) => {
    const { name, value } = e.target;
    setDisable(false);
    const data = { ...pageData };
    if (e.target.files) {
      const imag = productImages.find(
        (image) => image?._id === imageId || imageId === image
      );
      const files = Array.from(e.target.files).map((file) => {
        if (imag && imag._id) {
          file._id = imag._id;
        }
        return file;
      });
      if (productImages.length > 0) {
        const updatedImg = productImages.filter((img) => imag !== img);
        files.push(...updatedImg);
      }

      setProductImages(files);
    } else if (name === "isDeal") {
      data.isDeal = e.target.checked;
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
    const files = data.productImages.map((item) => item.imageUrl);
    setProductImages(files);
    setStatus("EDIT");
    setForm(true);
  };

  const handleCancel = () => {
    setForm(false);
    setPageData(productPayload);
    setStatus("CREATE");
    setCheckedCategory([]);
    setProductImages([]);
  };

  const handleClose = () => {
    handleCancel();
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct({ productId: id }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (status === "CREATE") {
      Object.keys(pageData).map((key) => {
        formData.append(key, pageData[key]);
      });

      checkedCategory.forEach((category) =>
        formData.append("categoryId", category)
      );
      productImages.map((eachImage) => {
        formData.append("productImages", eachImage);
      });

      const { status } = await dispatch(createProduct(formData)).unwrap();
      if (status == 200) {
        setForm(false);
        setPageData(productPayload);
      }
    } else if (status === "EDIT") {
      Object.keys(pageData).map((key) => {
        formData.append(key, pageData[key]);
      });
      formData.delete("categoryId");

      if (checkedCategory.length > 0) {
        formData.append("categoryId", checkedCategory);
      }
      formData.delete("productImages");

      const { status } = await dispatch(updateProduct(formData)).unwrap();
      if (status == 200) {
        setForm(false);
        setPageData(productPayload);
      }
    } else if (status === "UPLOAD_IMAGE") {
      formData.delete("categoryId");

      Object.keys(pageData).map((key) => {
        formData.delete(key);
      });

      formData.append("productId", pageData._id);

      productImages.forEach(async (eachImage) => {
        formData.append("image", eachImage);
        if (eachImage._id) formData.append("imageId", eachImage._id);
        if (eachImage.name) {
          const { status } = await dispatch(
            updateProductImage(formData)
          ).unwrap();
          if (status == 200) {
            setForm(false);
            setPageData(productPayload);
          }
        }
      });

      setOpenModal(false);
    }
  };

  const handleImageUpload = ({ _id }) => {
    navigate(`/products/${_id}`);
    // const data = { ...row };
    // data.productId = row._id;
    // setPageData(data);

    // setProductImages(data.productImages);
    // setOpenModal(true);
    // setStatus("UPLOAD_IMAGE");
  };

  const handleImageDelete = async (productId, img) => {
    
    await dispatch(deleteProductImage({ productId, imageId: img._id }));
    const proImag = productImages.filter((item) => item !== img);

    setDisable(true);
    setProductImages(proImag);
  };

  /*
  ########################################################################
          USE EFFECT
  ########################################################################
 */

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(
      getAllProducts({
        limit: paginationMode.pageSize,
        skip: paginationMode.page * paginationMode.pageSize,
      })
    );
  }, [paginationMode]);

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
      {productLoading && <Loader />}

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
                handleImageUpload={handleImageUpload}
                handleChange={handleChange}
                columns={productColumns}
                totalCount={productCount}
                paginationModel={paginationMode}
                setPaginationModel={setPaginationModel}
                paginationMode='server'
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
          <Box sx={{ mx: { md: 25, xs: 2 } }}>
            <FormComponent
              formDefinition={productForm1}
              grid={true}
              gridTemplateColumns={{
                md: "repeat(3,1fr)",
                xs: "repeat(2,1fr)",
              }}
              formPayload={pageData}
              status={status}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              onCancel={handleCancel}
              notShowButton={true}
            />
            <Box mt={3}>
              <Typography>Select Categories</Typography>
              <Box display={"flex"} gap={2} flexWrap={"wrap"}>
                {categoryIds}
              </Box>
            </Box>

            <FormComponent
              formDefinition={productForm2}
              grid={true}
              gridTemplateColumns='2fr'
              formPayload={pageData}
              status={status}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              onCancel={handleCancel}
              notShowButton={false}
            >
              <Box display={"flex"} gap={1} flexWrap={"wrap"}>
                {productImages &&
                  productImages.map((selectedImage, i) => {
                    return (
                      <img
                        src={selectedImage}
                        height={"80px"}
                        width={"80px"}
                        alt=''
                        key={i}
                      />
                    );
                  })}
              </Box>

              <Box
                mt={3}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  onClick={handleSubmit}
                  variant='outlined'
                  color='success'
                >
                  {status === "CREATE" ? "Create" : "Update"}
                </Button>
                <Button variant='outlined' color='error' onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            </FormComponent>
          </Box>
        </Wrapper>
      )}

      <ImageViewer
        openModal={openModal}
        handleClose={handleClose}
        productForm2={productForm2}
        pageData={pageData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        status={status}
        productImages={productImages}
        disable={disable}
        handleImageDelete={handleImageDelete}
      />
    </>
  );
};
