import React from "react";
import AddNoteForm from "../components/AddNoteForm";
import NoteList from "../components/NoteList";

function Notes() {
  return (
        <div className="Notes">
            <NoteList/>
            <AddNoteForm/>
        </div>
  );
}

export default Notes;
