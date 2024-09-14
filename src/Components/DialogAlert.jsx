import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogAlert = ({ handleUpdate, handleClose, open, alertText }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{alertText}</DialogTitle>

      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleUpdate}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAlert;
