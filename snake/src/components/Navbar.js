import React, { useState,useContext, useEffect  } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { UserContext } from './UserContext';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const showSidebar = () => setSidebar(!sidebar);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(()=>{
   if(user == null){setLoggedIn(false)}
   if(user !== null){setLoggedIn(true)}
  },[user]);
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          
          <h1 className='top-title'>Deep Sea Snake</h1>  
        
        </div>
        
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            { loggedIn
              ? SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
                })
              :  
                <li key={0} className={'nav-text'}>
                  <Link to={'/'}>
                    {<AiIcons.AiFillHome />}
                    <span>{'Home'}</span>
                  </Link>
                </li>
             
            }
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
