const express = require('express')
const router=express.Router();

const Notes= require('../models/Note');
var fetchuser=require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route-1 fetch all notes use as  get:/api/harry/fetchallnotes log in requirey****************
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
   const notes=await Notes.find({user:req.user.id})
   res.json(notes)
    
})


//Route-2 add note notes use as  get:/api/harry/fetchallnotes log in requirey****************
router.post('/addnotes',fetchuser,[

    body('tittle',"enter the valid title").isLength({ min: 3 }),
    // body('description',"enter the valid desc").isLength({ min: 5 })
    body('description',"Discriptiom fib lskcnkln").isLength({ min: 5 })

],async(req,res)=>{
    
    const {tittle,description,tag}=req.body
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const note=new Notes({
      tittle,description,tag,user:req.user.id
  })
  const notesave=await note.save()
    // const notes=await Notes.find({user:req.user.id})
    res.json(notesave)
     
 })

 //Route-3 update and exist  notes use as  put:/api/harry/update log in requirey*************

 router.put('/update/:id',fetchuser,async(req,res)=>{
    const {tittle, description,tag}=req.body
    // create newnote objects
    const newnote={}
    if(tittle){newnote.tittle=tittle}
    if(description){newnote.description=description}
    if(tag){newnote.tag=tag}

    // find the note to be updated and update it
    const note= await Notes.findById(req.params.id)
    if(!note){ return  res.status(404).send("not found")}
    if(note.user.toString()!==req.user.id){
      return res.status(401).send("not allow")
    }
    const notes =await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
   res.json({notes})
})


 //Route-3 delete an exist  notes use as  delete:/api/harry/update log in requirey*************

 router.delete('/delete/:id',fetchuser,async(req,res)=>{
    const {tittle, description,tag}=req.body

    // find the note to be updated and update it
    const note= await Notes.findById(req.params.id)
    if(!note){ return  res.status(404).send("not found")}
    if(note.user.toString()!==req.user.id){
      return res.status(401).send("not allow")
    }
    const notes =await Notes.findByIdAndDelete(req.params.id)
   res.json({"success:":"note has been dleted",note:note})
})



module.exports=router