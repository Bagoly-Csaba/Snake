import React, { useState,useContext } from 'react';
import  Logger  from '../Logger';
import { UserContext } from '../UserContext';
import './Login.css';
import Axios from 'axios';
function Login() {
  const {user, setUser} = useContext(UserContext);
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const login = () =>{
    Axios.post("http://localhost:3001/api/bejelentkezes",{
     username:name,
     password: password,
  }).then((response) =>{
    if(response.data.message){
    alert(response.data.message)}
    else{
      console.log(response.data[0])
      let felhasznalo = {
        id: response.data[0].id,
        username: response.data[0].username,
        email: response.data[0].email,
        password: response.data[0].password,
      }
      setUser(felhasznalo)
    }
  })
  }
  return (
    <div className='card'>
        <h1> Login </h1>
        
        <div className='textbox'>
            <input type='text' placehorder="Username" onChange={event => setName(event.target.value)}></input>
        </div>
        <div className='textbox'>
            <input type='password' placehorder="Password" onChange={event => setPassword(event.target.value)}></input>
        </div>     
        <button className='gombi' onClick={login}>Login</button>
        
            
    </div>
  );
}

export default Login;