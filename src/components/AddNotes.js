import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNotes = () => {
  const context = useContext(noteContext);
  const { addNotes } = context;
  const [note, setnote] = useState({ title: "", tag: "" });

  const handleClick = (e) => {
    
    
    addNotes(note.title, note.tag);
    setnote({id:"",title:" ",tag:""})
    
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container my-3">
        <h1>Add Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter Title"
              value={note.title}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Apply Tags
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              rows="3"
              value={note.tag}
              placeholder="Enter Tag"
              onChange={onChange}
            ></input>
          </div>
        </form>
        <button disabled={note.title.length<5 || note.tag.length<5}
          type="submit"
          className="btn btn-success "
          onClick={handleClick}
        >
          Add Note
        </button>
      </div>
    </>
  );
};

export default AddNotes;
