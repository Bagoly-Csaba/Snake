import React,{useState, useEffect} from 'react';
import './Login.css';
import Axios from "axios";

function Register() {
  const [username,setUsername] = useState("1");
  const [email,setEmail] = useState("1");
  const [password,setpassword] = useState("1");

  const submitRegister = () =>{
    Axios.post("http://localhost:3001/api/insert",{
      username:username,
      email:email,
      password:password,
  }).then(()=>{
    alert("success");
  });
  };

  return (
    <div className='card'>
        <h1> Register</h1>

          <div className='textbox'>  
            <input 
              type="text"  
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className='textbox'>
            <input 
              type="email"
              placeholder="email@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
          />
          </div>

          <div className='textbox'>
            <input 
              type="password"
              placeholder="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }} 
            />    
          </div>  
            
          <div>
            <button className='gombi' onClick={submitRegister}>Ok</button>
          </div>
          
    </div>
  );
}

export default Register;