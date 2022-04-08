import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

   //Get All notes

   const getNotes = async () => {
    const response =await   fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },

      
    });
    const json = await response.json();
    console.log(json);

    setNotes(json);
   
  };

  //Add Notes

  const addNotes = async (title, tag) => {
    const response =  await fetch(`${host}/api/notes/addNotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({title, tag})

      
    });
    const note= await response.json()
    setNotes(notes.concat(note)); // add notes to array.
  };

  // delete Notes
  const deleteNotes = async (id) => {
    const response =  fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: "DELETE", 

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      
    });


    console.log(id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit Notes
  const editNotes = async (id, title,tag) => {
    //API Calling ;)
    const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },

      body: JSON.stringify({title,tag}), // body data type must match "Content-Type" header
    });
    
 let newNotes= JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++)
     {
      const element = notes[index];

      if (element._id === id)
       {
        newNotes[index].title = title;
        newNotes[index].tag = tag;
        break
      }
    }

    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider value={{ notes, addNotes, deleteNotes, editNotes,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
