// import DataTable from "@/components/DataTable/DataTable";
// import { HeaderBar, Wrapper } from "@/components/Wrapper";
import { useTools } from "../../Hooks/useTools";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { payloads, formsJSON } from "../../constants/index";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  updateCategoryImageFn,
} from "../../thunk";
import { HeaderBar, Wrapper } from "../../Components/Wrapperr";
import { selectCategory } from "../../Store/categorySlice";
import { hasData } from "../../util/util";
import DataTable from "../../Components/DataTable/DataTable";
import { tableColumns } from "../../constants/tableColumns";
import { FormComponent } from "../../Components/FormComponent/FormComponent";
import { CustomModal } from "../../Components/CustomModal";
import ImageCard from "../../Components/ImageCard/ImageCard";
import { Loader } from "../../Components/Loader/Loader";

const { categoryForm } = formsJSON;
const { categoryPayload } = payloads;
const { categoryColumns } = tableColumns;
export const Category = () => {
  /*
  ########################################################################
          STATES
  ########################################################################
 */

  const { dispatch, useSelector } = useTools();
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [paginationMode, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [isForm, setForm] = useState(false);
  const [status, setStatus] = useState("CREATE");
  const [pageData, setPageData] = useState({ ...categoryPayload });

  const {
    data: categoryData,
    isError,
    isLoading: categoryLoading,
    totalCount,
  } = useSelector(selectCategory);

  /*
  ########################################################################
          HANDLER FUNCTIONS
  ########################################################################
 */

  const handleChange = (e) => {
    const { name, value } = e.target;

    const data = { ...pageData };
    if (e.target.files) {
      data[name] = e.target.files[0];
    } else {
      data[name] = value;
    }
    setPageData(data);
  };

  const handleImageUpload = (categoryId) => {
    setModal(true);
    setSelectedCategory(categoryId);
  };

  const handleActive = (category) => {
    const { _id, isActive } = category;
    const payload = {
      categoryId: _id,
      isActive: !isActive,
    };
    dispatch(updateCategory(payload));
  };
  const handleEdit = (row) => {
    const data = { ...row };
    data.categoryId = data._id;

    setPageData(data);
    setStatus("EDIT");
    setForm(true);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (status === "CREATE") {
      formData.append("categoryTitle", pageData.categoryTitle);
      formData.append("categoryImage", pageData.categoryImage);

      const { status } = await dispatch(createCategory(formData)).unwrap();
      if (status == 200) {
        setForm(false);
        setPageData(categoryPayload);
      }
    } else if (status === "EDIT") {
      if (pageData.categoryImage) {
        formData.append("categoryImage", pageData.categoryImage);
      }
      formData.append("categoryTitle", pageData.categoryTitle);
      formData.append("categoryId", pageData.categoryId);
      const { status } = await dispatch(updateCategory(formData)).unwrap();
      if (status == 200) {
        setForm(false);
        setPageData(categoryPayload);
      }
    }
  };

  const handleCancel = () => {
    setForm(false);
    setPageData(categoryPayload);
    setStatus("CREATE");
  };
  const handleDelete = (id) => {
    const payload = {
      categoryId: id,
      isDelete: true,
    };
    dispatch(deleteCategory(payload));
  };

  const handleUpdateCategoryImage = (id, file) => {
    const formData = new FormData();
    formData.append("categoryId", id);
    formData.append("image", file);

    dispatch(updateCategoryImageFn(formData)).then((res) => {


      setSelectedCategory(res.payload.data);
    });
  };


  /*
  ########################################################################
          USE EFFECT
  ########################################################################
 */

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <>
      {categoryLoading && <Loader />}
      <CustomModal open={modal} handleClose={() => setModal(false)}>
        <Typography variant='h6' fontWeight={"bold"}>
          Category Image
        </Typography>
        <ImageCard
          imageId={selectedCategory?._id}
          imageUrl={selectedCategory?.categoryImage}
          onUpdate={handleUpdateCategoryImage}
        />
      </CustomModal>
      <HeaderBar title={"Product Category"} />
      {isForm === false ? (
        <>
          <Wrapper>
            <Box mb={4}>
              <Button variant='contained' onClick={() => setForm(true)}>
                Add New Category +
              </Button>
            </Box>
            {hasData(categoryData) ? (
              <DataTable
                rows={categoryData}
                handleActive={handleActive}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleImageUpload={handleImageUpload}
                columns={categoryColumns}
                totalCount={totalCount}
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
            formDefinition={categoryForm}
            formPayload={pageData}
            status={status}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onCancel={handleCancel}
          ></FormComponent>
        </Wrapper>
      )}
    </>
  );
};
