import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

     
 const [credential, setcredential] = useState({name:"",  email:"",password:"", cpassword:"" })
 const navigate = useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        
     const   {name,email,password}=credential;

    const response = await fetch("http://localhost:5000/api/sami/bhai", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password})
      });
                
        const json= await response.json();
        
        console.log(json)
        if(json.success){
            // redirect
            localStorage.setItem('tocken',json.authtocken);
            navigate('/')
            props.showalert("create successfully","success");
        }
        else{
            props.showalert("invalid credential");
        }


}

const onChange=(e)=>{
    setcredential({...credential, [e.target.name] : e.target.value})
}

    return (
        <div>
            <form onSubmit={handleSubmit} >


  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text"  className="form-control"  id="name" name='name' aria-describedby="emailHelp" onChange={onChange}  />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>


  

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email"  className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>


  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password"  className="form-control" name='password' id="password" minLength={5} onChange={onChange} />
  </div>

  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Conform-Password</label>
    <input type="password"  className="form-control" name='cpassword' id="cpassword" minLength={5} onChange={onChange} />
  </div>

  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}


export default Signup
