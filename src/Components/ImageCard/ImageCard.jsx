import React, { useState } from "react";
import { Box, IconButton, Card, CardMedia, CardActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ImageCard = ({ imageId, imageUrl, onDelete, onUpdate }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDelete = () => {
    onDelete(imageId);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      onUpdate(imageId, file);
    }
  };

  const handleUpdate = () => {
    // Programmatically trigger the file input click
    document.getElementById(`file-input-${imageId}`).click();
  };

  return (
    <Card sx={{ width: 200, margin: 2 }}>
      <CardMedia
        component='img'
        height='140'
        image={imageUrl}
        alt='Product Image'
      />
      <CardActions>
        {onDelete && (
          <IconButton onClick={handleDelete} aria-label='delete'>
            <DeleteIcon color='error' />
          </IconButton>
        )}
        <IconButton onClick={handleUpdate} aria-label='update'>
          <EditIcon color='primary' />
        </IconButton>
        <input
          type='file'
          id={`file-input-${imageId}`}
          style={{ display: "none" }}
          accept='image/*'
          onChange={handleFileChange}
        />
      </CardActions>
    </Card>
  );
};

export default ImageCard;
