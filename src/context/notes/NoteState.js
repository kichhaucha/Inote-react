// import react from "react";
import noteContext from "./NoteContext";
import React from 'react'
import { useState } from "react";
const NoteState=(props)=>{
const host="http://localhost:5000"

 const initialnote =[ ]


const [notes, setNotes] = useState(initialnote)


// get all note
const getNotes=async()=>{
  // api call 
  const response = await fetch(`${host}/api/harry/fetchallnotes`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'auth-tocken':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMWQzNzVkM2M2YjEwYmNjNTVhZjI1In0sImlhdCI6MTY0MjE4OTY4NX0.Bqcu7KxKZRK_2n0Vy9UFnxUbI8PpPQi7MsvYLGwWhn4"
     
    }
  });

  const json= await response.json();
  
  setNotes(json)

}

// add note
const addNote=async(tittle, description, tag)=>{
  // api call 
  const response = await fetch(`${host}/api/harry/addnotes/`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'auth-tocken':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMWQzNzVkM2M2YjEwYmNjNTVhZjI1In0sImlhdCI6MTY0MjE4OTY4NX0.Bqcu7KxKZRK_2n0Vy9UFnxUbI8PpPQi7MsvYLGwWhn4"
    },
  
    body: JSON.stringify({tittle, description, tag})

  });
  const note=await response.json(); 
  setNotes(notes.concat(note))

}
// delete note

const deleteNote=async (id)=>{
  // api call
  const response = await fetch(`${host}/api/harry/delete/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'auth-tocken':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMWQzNzVkM2M2YjEwYmNjNTVhZjI1In0sImlhdCI6MTY0MjE4OTY4NX0.Bqcu7KxKZRK_2n0Vy9UFnxUbI8PpPQi7MsvYLGwWhn4"
     
    }
  

  });
  const json= response.json(); 

 // console.log("deleting note with id "+id)
  const newnote=notes.filter((note)=>{
return note._id!==id
  })
  setNotes(newnote)
}

// edit note
const editNote=async(id, tittle, description, tag)=>{
// api call

const response = await fetch(`${host}/api/harry/update/${id}`, {
  method: 'PUT', // *GET, POST, PUT, DELETE, etc.
  headers: {
    'Content-Type': 'application/json',
    'auth-tocken':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMWQzNzVkM2M2YjEwYmNjNTVhZjI1In0sImlhdCI6MTY0MjE4OTY4NX0.Bqcu7KxKZRK_2n0Vy9UFnxUbI8PpPQi7MsvYLGwWhn4"
   
  },

  body: JSON.stringify({tittle,description,tag})
});
  const json=await response.json(); 
let NewNote=JSON.parse(JSON.stringify(notes))
  // logic to edit in clint
  for (let index = 0; index <  NewNote.length; index++) {
    const element = notes[index];
    
 
  if(element._id===id){
    NewNote[index].tittle=tittle;
    NewNote[index].description=description;
    NewNote[index].tag=tag;
    break;
  }
 
  }
setNotes(NewNote)
}


  return(
      <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}} >
          {props.children}
          </noteContext.Provider>
  )
}


export default NoteState;
