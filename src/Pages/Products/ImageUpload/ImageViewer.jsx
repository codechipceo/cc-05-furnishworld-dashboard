import React from "react";
import { CustomModal } from "@/Components/CustomModal";
import { Box, IconButton, Button } from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import ImageList from "@mui/material/ImageList";
import { ImageListItem } from "@mui/material";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { VisuallyHiddenInput } from "@/Components/FormComponent/DynamicForm";
import FormComponent from "@/Components/FormComponent/FormComponent";

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
        {productImages && productImages.length > 0 ? (
          <ImageList
            sx={{
              width: { md: 600, sx: 400, xs: 300 },

              display: "grid",
              gap: 5,
              gridTemplateColumns: "repeat(3,1fr)",
            }}
            cols={3}
            rowHeight={164}
          >
            {productImages &&
              productImages.map((selectedImage, i) => {
                return (
                  <ImageListItem key={i}>
                    <img
                      src={
                        typeof selectedImage === "object" &&
                        selectedImage.imageUrl
                          ? selectedImage.imageUrl
                          : URL.createObjectURL(selectedImage)
                      }
                      style={{
                        objectFit: "center",
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                      alt=""
                    />

                    <ImageListItemBar
                      sx={{ display: "flex", justifyContent: "center" }}
                      actionIcon={
                        <>
                          <IconButton
                            role={undefined}
                            tabIndex={-1}
                            component="label"
                          >
                            <EditSharpIcon />
                            <VisuallyHiddenInput
                              type="file"
                              onChange={(e) => handleChange(e, selectedImage)}
                              name={productForm2[2].name}
                              accept={productForm2[2].mimeType}
                            />
                          </IconButton>
                          <IconButton
                            sx={{ color: "red" }}
                            onClick={() =>
                              handleImageDelete(pageData._id, selectedImage)
                            }
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </>
                      }
                    />
                  </ImageListItem>
                );
              })}
          </ImageList>
        ) : null}
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
