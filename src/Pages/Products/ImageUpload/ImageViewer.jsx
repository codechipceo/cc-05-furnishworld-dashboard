import React from "react";
import { CustomModal } from "@/Components/CustomModal";
import { Box, IconButton, Button } from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import ImageList from "@mui/material/ImageList";
import { ImageListItem } from "@mui/material";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { VisuallyHiddenInput } from "@/Components/FormComponent/DynamicForm";
import { FormComponent } from "@/Components/FormComponent/FormComponent";

const ImageViewer = ({
  openModal,
  handleClose,
  productForm2,
  pageData,
  handleChange,
  handleSubmit,
  productImages,
  status,
  disable,
  handleImageDelete,
}) => {
  return (
    <CustomModal open={openModal} handleClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormComponent
          formDefinition={[productForm2[2]]}
          grid={true}
          gridTemplateColumns="2fr"
          formPayload={pageData}
          status={status}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onCancel={handleClose}
        />
 
      </Box>

      <Box mt={3} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          color="success"
          disabled={disable}
        >
          Save
        </Button>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </CustomModal>
  );
};

export default ImageViewer;
