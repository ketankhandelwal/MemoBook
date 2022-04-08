import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})
  let history = useHistory();
  const handleSubmit = async (e) => {
  
    const {name,email,password}=credentials
    e.preventDefault();
    
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email, password})
    });
    const json = await response.json()
    console.log(json);
    props.showAlert("Login Success","success")
   
        localStorage.setItem('token', json.authtoken); 
        history.push("/");

   
}

const onChange = (e)=>{
    setcredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <div><form onSubmit={handleSubmit}>
 <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" name="name"/>
      <div id="name"  onChange={onChange} className="form-text"></div>
    </div>

    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onChange} aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" name="password" onChange={onChange}minLength={5} required/>
    </div>
    <div className="mb-3">
      <label htmlFor="cpassword" className="form-label">Confirm Password</label>
      <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
    </div>
   
    <button type="submit" className="btn btn-primary">Submit</button>
  </form></div>
  )
}

export default Signup