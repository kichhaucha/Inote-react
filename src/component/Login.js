import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'



const Login = (props) => {

 
 const [credential, setcredential] = useState({email:"",password:""})
 const navigate = useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/sami/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credential.email,password:credential.password})
          });
                    
            const json= await response.json();
            
            console.log(json)
            if(json.success){
                // redirect
                localStorage.setItem('tocken',json.authtocken);
                navigate('/')
                props.showalert("successfully","success");
            }
            else{
              props.showalert("invalid credential");
            }

    }

    const change=(e)=>{
        setcredential({...credential, [e.target.name] : e.target.value})

     }

    return (
        <div>
           <form onSubmit={handleSubmit}  >
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={change} id="email" value={credential.email} name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" name='password' onChange={change} className="form-control" value={credential.password} id="password"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
        </div>
    )
}

export default Login
