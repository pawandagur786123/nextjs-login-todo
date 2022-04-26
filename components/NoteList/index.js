import React,{useState, useEffect} from "react";
import { connect } from "react-redux";
import { useRouter  } from "next/router";
import { editNote, removeNote } from "../../store/actions";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityChild from "../VisibilityChild";
import SnackBar from "../SnackBar";



function NoteList(props) {
  const router = useRouter() 
  const [snackbar, setSnackbar] = useState({
    show: false,
    status: "",
    message: "",
  });

  useEffect(() => {
    if (!props.auth.isLoggedIn) {
      router.push("/")
    }
  });

  const onDelete = (noteId) => {
    props.remove(noteId)
    props.edit(null)
    setSnackbar({
      show: true,
      status: "error",
      message: "Deleted Successfully!",
    });
}

  

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>
          <span className="highlight">Notes</span>
        </h1>
      </div>

      <div className="app-sidebar-notes">
        {props.notes.map((note) => (
          <div className={`app-sidebar-note`}>
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <p>{note.text && note.text.substr(0, 100) + "..."}</p>
            </div>
            <div>
              <EditIcon
                className="sidebar-note-edit"
                onClick={() => {note.id === props.editData?.id ? alert("In Edit Mode Already"):props.edit(note.id)}}
              />
              <DeleteIcon
                className="sidebar-note-delete"
                onClick={()=>onDelete(note.id)}
              />
            </div>
          </div>
        ))}
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

function mapStateToProps(state) {
  return {
    notes: state.notes,
    auth: state.auth,
    editData: state.editing
  };
}

function mapDispatchToProps(dispatch) {
  return {
    remove: (id) => dispatch(removeNote(id)),
    edit:(id) => dispatch(editNote(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
