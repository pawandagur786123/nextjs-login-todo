import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "30px",
    textTransform: "capitalize",
    borderRadius: 5,
    boxShadow: "none",
    cursor:'pointer',
    backgroundColor: (props) => props.bgColor || "#3b7ded",
    color: (props) => props.color || theme.palette.background.default,
    padding: "8px",
    outline: "none",
    "&:hover": {
      backgroundColor: (props) => props.bgColor || "#3b7ded",
      boxShadow: "none",
      outline: "none",
    },
  },
}));

export default function ContainedRectangle(props) {
  const { text, fullWidth, onClick } = props;
  const classes = useStyles(props);

  return (
    <Button
      varaint="contained"
      fullWidth={fullWidth || false}
      className={`${classes.root} ${props.className}`}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
