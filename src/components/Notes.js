import React,{useContext,useEffect,useRef,useState} from 'react'
import noteContext  from '../context/notes/noteContext';
import NoteItems from './NoteItems';
import AddNotes  from './AddNotes';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Notes = (props) => {
  let history= useHistory();
    const context= useContext(noteContext);
    const {notes,getNotes,editNotes}= context;
    useEffect(() => {
     
     getNotes();
      

     
     // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose=useRef(null);
    console.log("ok")
    const [note, setnote] = useState({ id:"",etitle: "", etag: "" });

    const updateNotes= (currentNote)=>{
      ref.current.click();
      setnote({id:currentNote._id,etitle:currentNote.title,etag:currentNote.tag})
      console.log("Working")
      props.showAlert("Updated Successfully","success ")

      
    }
    const handleClick = (e) => {
      e.preventDefault();
      editNotes(note.id,note.etitle,note.etag);
      refClose.current.click();
      
    
    
    console.log("updating",note)      
    };
  
    const onChange = (e) => {
      setnote({ ...note, [e.target.name]: e.target.value });
    };
 

     

  return (
    <>
    <AddNotes/>
    
<button  ref= {ref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>


<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle"  aria-describedby="emailHelp" onChange={onChange}/>
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag"   onChange={onChange}/>
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.etag.length<5}  type="button" className="btn btn-secondary" onClick={handleClick}>Update Note</button>
                            
                        </div>
                    </div>
                </div>
            </div>

    <div className="row my-3">
    <h1>Ur Notes</h1>
    {notes.length===0 &&'No notes to display'}
    
    {notes.map((note)=>
    {

      return <NoteItems key={note._id} updateNotes={updateNotes} note={note}/>
    })}
      
    </div> 

    </>
    
  )
}

export default Notes;


