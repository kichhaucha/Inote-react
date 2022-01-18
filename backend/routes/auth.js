
// this is import express for nodemon start
const express = require('express')


// make router for make raoter
const router=express.Router();
// for validation
const { body, validationResult } = require('express-validator');
// this is db connected yah .. se connect hoga kewal mysql se my sql me baar bar karn apdta hai
// const con = require('../db');
// for has and salt security
const bcrypt = require('bcryptjs');
// this is for token
const jwt = require('jsonwebtoken');
// this is for schema for models include data
// const databaseUser = require('../models/User');
const User= require('../models/User');
var fetchuser=require('../middleware/fetchuser');



// ***************************this is mongodb after connectv setup


//Route-1 this is use for tocken generate validate
let secreat="hlosamibhai";


// creat a user use this  post:/api/auth/bhai log in requirey********************
router.post('/bhai',[
  body('name',"enter the valid name").isLength({ min: 3 }),
  body('email',"enter the valid email").isEmail(),
  body('password',"enter the valid password").isLength({ min: 5 }),
],async (req,res)=>{
  let success= false;

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() })};
  // check wether the user this  email exist already

  let user= await User.findOne({email:req.body.email})
  if(user){
    return res.status(500).json({success, errors:"this is already exist"})
  };
  

// this is has salt securuty
const salt =await bcrypt.genSalt(10);
    
let secpass= await bcrypt.hash(req.body.password,salt)
  
  // cerate a new user
    user=await User.create({
      name: req.body.name,
      email: req.body.email,
      password:secpass
    })
   
  

    // const user=index2(req.body);
    // .then(user => res.json(user))
    // .catch(err=>{
    //   console.log(err)
    //   res.json({error:"please enter a uniq email",message:err.message})
    // })

    // payload awt tocken
   const data={
     user:{
       id:user.id
     }
   }

    const authtoken = jwt.sign(data, secreat);
    success=true;
    res.json({success, authtoken});   
    

    
})

//Route-2 authenticate a user using post:/api/sami/bhai. no login require************

router.post('/login',[
  body('email',"enter the valid email").isEmail(),
  body('password',"password can not be blank").exists()
],async (req,res)=>{
 let success=false;
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() })
  };
// destucturing 

const {email,password}=req.body

try {
  let user= await User.findOne({email})
  if(!user){
    return res.status(400).json({success, errors: "please try to log in with credential"})
  }
  
  let comp=await bcrypt.compare(password, user.password)
      if(!comp){
      return res.status(400).json({ success, errors: "please try to log in with credential"})
    }
  //  res.json(user)
    
    // payload awt tocken
    const data={
      user:{
        id:user.id
      }
    }
 
     const authtoken = jwt.sign(data, secreat);
     success=true;
     res.json({success,authtoken});  
 
} catch (error) {
  
}    

})
//Route-3 Get loggedin  user details a user using post:/api/sami/userfind. no login require************

router.post('/getuser',fetchuser, async (req,res)=>{

try {
  
 userId=req.user.id
  const user =await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
   
}
})







































// *********************************************
// this is post data log in 
router.post('/',[
    body('name',"this name isinvalid please put the valid name").isLength({ min: 5 }),
    body('email',"this is emailis invailid plese put the valid email").isEmail(),
    body('password').isLength({ min: 5 })
],async(req,res)=>{
  // this is validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


// this is has salt securuty
    const salt =await bcrypt.genSalt(10);
    
    let pass= await bcrypt.hash(req.body.password,salt)
     password=pass;
  //  const data={name:req.body.name,email:email}
    const data={
      "name":req.body.name,
      "email":req.body.email,
      "password":password
    }
   


   let user=  con.query('INSERT INTO inotes SET ?', data, function (error, results, fields) {
        if(error) error
        // res.json(data);
      })
  //  this is taken generate
         const data1={
           data:{
             "id":data.id
           }
         }
      const authtoken = jwt.sign(data1, secreat);
      res.json({authtoken});   
    
})
// authentication the uer post not login requer


router.post('/',[
  body('email',"this is emailis invailid plese put the valid email").isEmail(),
  body('password',"pasword is not blank").exists(),
],async(req,res)=>{
// this is validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password}=req.body;
try {
  const passwordcomp=bcrypt.compare(password,data.password)
} catch (error) {
  
}








})

  module.exports=router