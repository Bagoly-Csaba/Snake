
import Board from '../components/homePage/Board';
import '../App.css'
import { UserContext } from '../components/UserContext';
import React,{useState, useEffect, useContext} from 'react';
import Axios from "axios";
import { ChosenMap } from '../components/ChosenMap';
import { useHistory   } from "react-router-dom";

function Profile() {
  const {user, setUser} = useContext(UserContext);
  const history = useHistory();
    const [mapList, setMapList] = useState([])
    const {chosenMap, setChosenMap} = useContext(ChosenMap);
    useEffect(()=>{
      Axios.get(`http://localhost:3001/api/getOwnMaps/${user.username}`).then((response) =>{
      setMapList(response.data);
      }); 
  },[]);
  useEffect(() => {
    // code to run after render goes here
    const tableEl = document.querySelector('table');
    tableEl.addEventListener('click',onClickPlay);
    function onClickPlay(e){
      if(tableEl !== null){
        const btn = e.target;
        const row = btn.closest("tr");
        setChosenMap(row.cells[0].innerHTML)
      } 
    }
  },[]);
  const test =()=>{
    history.push('/game')
   
  }
  const logout =()=>{
    history.push('/')
    setUser(null)
  }
  let tb_data = mapList.map((item)=>{
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.width}</td>
        <td>{item.height}</td>
        <td>{item.uploaded_by}</td>
        <td>
         <button className='playBtn' onClick={()=>test()}>PLay</button>
        </td>
      </tr>
    )
   })
  return (
    <div >
      <div className='profile'>
        <h1>{user.username}</h1>
        <button  onClick={()=>logout()}>logout</button>
      </div>
    <div className='home'>  
        <table >
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>width</th>
              <th>height</th>
              <th>uploaded_by</th>
              <th>play</th>
            </tr>
          </thead>
          <tbody>
                {tb_data}
          </tbody>
        </table>
    </div>
    </div>
  );
}

export default Profile;
