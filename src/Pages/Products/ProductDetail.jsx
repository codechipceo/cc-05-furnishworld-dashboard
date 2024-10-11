import React, { useEffect } from "react";
import { useTools } from "../../Hooks/useTools";
import {
  deleteProductImage,
  getProductById,
  updateProductImage,
} from "../../thunk";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../Store/productSlice";
import { HeaderBar } from "../../Components/Wrapperr";
import ImageCard from "../../Components/ImageCard/ImageCard";
import { Loader } from "../../Components/Loader/Loader";
import { Box, Button } from "@mui/material";

import { IconButton, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const ImageUploadBox = ({ onImageUpload }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <Box
      sx={{
        border: "2px dashed #1976d2",
        borderRadius: "8px",
        width: "200px",
        height: "140px",
        padding: "20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <input
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id='upload-button'
      />
      <label htmlFor='upload-button'>
        <IconButton component='span'>
          <CloudUploadIcon fontSize='large' />
        </IconButton>
      </label>
      <Typography variant='body1' sx={{ marginTop: "10px" }}>
        Add New Image
      </Typography>
    </Box>
  );
};

export default ImageUploadBox;

export const ProductDetail = () => {
  const { dispatch, navigate } = useTools();
  const { productId } = useParams();
  const { singleProduct, isLoading: productLoading } =
    useSelector(selectProducts);


  const formData = new FormData();
  const handleUpdate = (imageId, file) => {
    formData.append("imageId", imageId);
    formData.append("productId", productId);
    formData.append("files", file);

    dispatch(updateProductImage(formData));
  };

  const handleDelete = (imageId) => {
    if (singleProduct?.productImages.length < 2) {
      toast.error("Cannot delete,1 image is required");
      return;
    }

    dispatch(deleteProductImage({ imageId, productId }));
  };
  const RenderImages = () => {
    const productImages = singleProduct?.productImages;

    return (
      <>
          <Button color="error" variant="text" onClick={() =>{navigate(-1)}}><ArrowBackIcon  /> </Button>
        <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"}>
          {productImages?.map((eachImage) => {
            const { imageId, imageUrl, _id } = eachImage;
            return (
              <ImageCard
                key={eachImage._id}
                imageId={_id}
                imageUrl={imageUrl}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            );
          })}

          {/* <ImageUploadBox /> */}
        </Box>
      </>
    );
  };

  useEffect(() => {
    dispatch(getProductById({ productId }));
  }, []);
  return (
    <div>
      {productLoading && <Loader />}

      <HeaderBar title={"Product Images"} />
      <RenderImages />
      {/* <ImageUploadBox /> */}
    </div>
  );
};
