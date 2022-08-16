import React, { useContext, useState, useEffect }  from 'react';
import Login from '../components/homePage/Login';
import Register from '../components/homePage/Register';
import MapsTable from '../components/homePage/MapsTable';
import { UserContext } from '../components/UserContext';
import { Link } from 'react-router-dom';
import './Home.css';
function Home() {
  const {user, setUser} = useContext(UserContext);
  const [active, setActive] = useState("LoginCard");


  let card;
  let gomb;
  if (active === "LoginCard" ) {
    card = <Login />
    gomb = <button onClick={() => setActive("RegisterCard")}>Register</button>
  } else {
    card = <Register />
    gomb = <button onClick={() => setActive("LoginCard")}>Login</button>
  }

  

  return (
    <div className='home' >
      {user ? (<MapsTable/>):(
         <div >
         {card}
         <div className='container'>
          <div className='gomb'>
         {gomb}
          </div>
         </div>
         </div>
         
      )}
      
    </div>
    
  );
}

export default Home;
