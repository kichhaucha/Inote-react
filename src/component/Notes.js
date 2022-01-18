

import Noteitem from './Noteitem'
import AddNotes from './AddNotes'
// import { useNavigate } from 'react-router-dom'

import { useContext,useEffect,useRef,useState } from 'react'
import noteContext from '../context/notes/NoteContext'


function Notes() {
  // const navigate = useNavigate()
    const context = useContext(noteContext)
    const {notes,getNotes,editNote}=context
    
  useEffect(() => {
    
      getNotes() 
  } ,[])
  const ref = useRef(null)
  const refclose = useRef(null)


//  use state hook and form onclik on chabhe defind

const [note, setNote] = useState({id:"", etittle: "", edescription: "", etag: ""})

const handleclick=(e)=>{
    // console.log("updating noete",note)
    editNote(note.id,note.etittle,note.edescription,note.etag);
    refclose.current.click();
//    addNote(note.tittle, note.description, note.tag);
}
const change=(e)=>{
   setNote({...note, [e.target.name] : e.target.value})

}

const updateNote=(currentNote)=>{
    ref.current.click();
    setNote({id:currentNote._id,  etittle:currentNote.tittle ,edescription:currentNote.description,etag:currentNote.tag })
}


    return (
        <>
         <AddNotes/>
           
        
<button ref={ref}  type="button" className="btn btn-primary d-none " data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit-Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      {/* add note form here */}
      <form className="my-4">
                <div className="mb-3">
                    <label htmlFor="etittle" className="form-label">etittle</label>
                    <input type="text" className="form-control" id="etittle" value={note.etittle} name='etittle' aria-describedby="emailHelp" onChange={change} minLength={5} required />
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">edescription</label>
                    <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription'onChange={change} minLength={5} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">etag</label>
                    <input type="etag" className="form-control" id="etag" value={note.etag} name='etag'onChange={change} />
                </div>
            
            
                {/* <button type="submit" className="btn btn-primary" onClick={clickhandle}  >Add-Note</button> */}
                </form>
        ...
      </div>
      <div className="modal-footer">
        <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleclick} type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

        <div className="row my-3">
        <h2>Your Note</h2>
        {/* <div className="container row my-3 "> */}
        {/* {notes.length===0 && 'no note display'} */}
        {notes.map((note)=>{
            return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
      {/* </div> */}
        </>
    )
}

export default Notes
