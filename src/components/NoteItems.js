import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

const NoteItems = (props) => {
  const context = useContext(NoteContext);
  const { deleteNotes } = context; // deletenote utha k leke ao...
  const { note ,updateNotes } = props;
  
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.tag}</p>
          <i
            className="fa-solid fa-trash-can mx-2"
            onClick={() => {
              deleteNotes(note._id);
             
            }}
          ></i>
            <i className="far fa-edit mx-2" onClick={()=>{updateNotes(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItems;
