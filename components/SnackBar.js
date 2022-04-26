import React from "react";
import { Slide, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function SnackBar({ show, status, message, onClose, slideIn = true }) {
  const handleClose = () => {
    onClose({ show: false, error: "", message: "" });
  };

  if (!slideIn) {
    return (
      <Snackbar
        open={show}
        style={{ zIndex: 1000 }}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant={"filled"}
          severity={status}
          onClose={handleClose}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <Snackbar
      open={show}
      style={{ zIndex: 1000 }}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={(props) => <Slide {...props} direction="left" />}
      onClose={handleClose}
    >
      <Alert
        elevation={6}
        variant={"filled"}
        severity={status}
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;
