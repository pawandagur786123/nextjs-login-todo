import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addNote, editNote, updateNote, logout } from "./../../store/actions";
import SnackBar from "../SnackBar";
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Slide,
  Alert
} from "@material-ui/core";
import ButtonContained from "../ButtonContained";
import VisibilityChild from "../VisibilityChild";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  button: {
    display: "flex",
    margin: "20px 0",
    minWidth: "200px",
    
  },
  logout: {
    background: "red",
    "&:hover": {
      background: "#a50f0f"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize:12,
      padding:5
    }
  },
  buttonDelete: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 20
  }
}));

function AddNoteForm(props) {
  const classes = useStyles();
  const [form, setForm] = useState({});
  const [open, setOpen] = React.useState(false);
  const [snackbar, setSnackbar] = useState({
    show: false,
    status: "",
    message: ""
  });

  useEffect(() => {
    if (props.editing?.id) {
      const note = props.notes.filter(
        (data) => data.id === props.editing?.id
      )?.[0];
      setForm({ ...note });
    } else {
      setForm({
        title: "",
        text: ""
      });
    }
  }, [props.editing?.id]);

  function handleChange(e) {
    const { name, value } = e.target;
    let newForm = { ...form };
    newForm[name] = value;
    setForm(newForm);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title) {
      alert("Add title");
      return;
    }
    if (props.editing?.id) {
      props.updateNote(form);
      props.editNote(null);
      setSnackbar({
        show: true,
        status: "success",
        message: "Updated Successfully!"
      });
    } else {
      if (props.notes.filter((data) => data.title === form.title)?.length > 0) {
        setSnackbar({
          show: true,
          status: "error",
          message: "same title exist for a different note!"
        });
        return;
      }
      props.addNote(form);
      setSnackbar({
        show: true,
        status: "success",
        message: "Added Successfully!"
      });
    }
    setForm({ title: "", text: "" });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="app-main">
      <div className={classes.buttonDelete}>
        <ButtonContained
          text={"Logout"}
          className={classes.logout}
          onClick={handleClickOpen}
        />
      </div>
      <VisibilityChild>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Are you sure you want to logout?"}</DialogTitle>
          <DialogActions style={{ paddingTop: 20 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => props.logout()}>Yes</Button>
          </DialogActions>
        </Dialog>
      </VisibilityChild>
      <div
        className="app-main-note-edit"
        style={{
          background: props.editing?.id !== null ? "#e6f7f752" : "none"
        }}
      >
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          autoFocus
        />
        <textarea
          id="body"
          name="text"
          placeholder="Write your note here..."
          value={form.text}
          onChange={handleChange}
        />
      </div>
      <div className="add-btn">
        <ButtonContained
          text={props.editing?.id ? "Update" : "Add Note"}
          className={classes.button}
          onClick={handleSubmit}
        />
      </div>
      {snackbar.show ? (
        <VisibilityChild>
          <SnackBar
            {...snackbar}
            onClose={() =>
              setSnackbar({ show: false, status: "", message: "" })
            }
          />
        </VisibilityChild>
      ) : null}
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addNote: (payload) => {
      dispatch(addNote(payload));
    },
    editNote: (payload) => {
      dispatch(editNote(payload));
    },
    updateNote: (payload) => {
      dispatch(updateNote(payload));
    },
    logout: () => {
      dispatch(logout());
    }
  };
}

function mapStateToProps(state) {
  return {
    editing: state.editing,
    notes: state.notes
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteForm);
