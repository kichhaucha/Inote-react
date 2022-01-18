import React, { useState,useContext } from 'react'
import noteContext from '../context/notes/NoteContext'



const AddNotes = () => {
    
    const context = useContext(noteContext)
    const {addNote}=context
     
    // const [note, setNote] = useState({tittle:"",description:"",tag:"defolt"})
    const [note, setNote] = useState({tittle: "", description: "", tag: ""})

     const clickhandle=(e)=>{
        e.preventDefault();
        addNote(note.tittle, note.description, note.tag);
        setNote({tittle: "", description: "", tag: ""})
     }
     const change=(e)=>{
        setNote({...note, [e.target.name] : e.target.value})

     }
    

    return (
        <div>
            <div className="container my-4">
            <h2>Add note</h2>
            <form className="my-4">
                <div className="mb-3">
                    <label htmlFor="tittle" className="form-label">tittle</label>
                    <input type="text" className="form-control" id="tittle" name='tittle' aria-describedby="emailHelp" value={note.tittle} minLength={5} required onChange={change} />
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <input type="text" className="form-control" value={note.description} id="description" name='description'onChange={change} minLength={5} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" value={note.tag} className="form-control" id="tag" name='tag'onChange={change} />
                </div>
            
            
                <button type="submit" className="btn btn-primary" onClick={clickhandle}  >Add-Note</button>
                </form>
                </div>
        </div>
    )
}

export default AddNotes


