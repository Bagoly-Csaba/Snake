import React, {useState,Component, useRef, useEffect, useContext } from 'react';
import createBoardCreator from '../components/createPage/createBoardCreator';
import CreatorTile from '../components/createPage/CreatorTile';
import CreatorCell from '../components/createPage/CreatorCell';
import CreatorBottomCells from '../components/createPage/CreatorBottomCells';
import  Axios  from 'axios';
import { UserContext } from '../components/UserContext'
import { ChosenMap } from '../components/ChosenMap'
import { useHistory   } from "react-router-dom";

function Create() {
  const history = useHistory();
  const [activeCard, setActiveCard] = useState(0);
  const [board,setBoard] = useState([]);
  const [grid,setGrid] = useState([]);
  const [width,setWidth] = useState(3);
  const [height,setHeight] = useState(3);
  const [palyaneve,setPalyaNeve] = useState();
  const [bodyPart,setBodyPart] = useState(0);
  const [lastPos,setLastPos] = useState([0,0]);
  const [savedBoard,setSavedBoard] = useState([]);
  const [buildStade, setBuildStade] = useState(0);
  const {user, setUser} = useContext(UserContext);
  const {chosenMap, setChosenMap} = useContext(ChosenMap);

  useEffect(()=>{
  function freshBoard (row,col){
    const newBoard = createBoardCreator(row, col);
      setBoard(newBoard);
    setGrid(newBoard.board);
  }freshBoard(height,width)
},[height]);

  const tileClick = (x,y) =>{
    if(buildStade !== 5){
    let newGrid = JSON.parse(JSON.stringify(grid));
    let newBoard = JSON.parse(JSON.stringify(board));
    let elozo = lastPos;

    if(bodyPart === 1){
      setLastPos([x,y])
    }
    if(bodyPart === 5){
      if(newGrid[x][y].value === 4){buildStade(5)}
      if(x === elozo[0]){
        if(newGrid[x][y].value === 0 || newGrid[x][y].value === 3 || newGrid[x][y].value === 4 ){
          if(y + 1 === elozo[1] || y - 1 === elozo[1]){
              newGrid[x][y].value = 5;
              elozo[1] = y;
              setGrid(newGrid);  
              
            }   
        }
      }
      if(y === elozo[1]){
        if(newGrid[x][y].value === 0 || newGrid[x][y].value === 3 || newGrid[x][y].value === 4 ){
            if(x + 1 === elozo[0] || x - 1 === elozo[0]){
              newGrid[x][y].value = 5;
              elozo[0] = x;
              setGrid(newGrid);
 
          }   
        }
      }
    setLastPos(elozo);
    }
    else{
    newGrid[x][y].value = bodyPart;
    newBoard.board = newGrid;
    }
    setGrid(newGrid);
    setBoard(newBoard);
  }
  }
  //bal click event
  const tileRightClick = (x,y) =>{
    if(buildStade == 0 ){
    let newGrid = JSON.parse(JSON.stringify(grid));
    let newBoard = JSON.parse(JSON.stringify(board));
    newGrid[x][y].value = 2;
    newBoard.board = newGrid;
    setGrid(newGrid);
    setBoard(newBoard);
    }
  }
//el menti a testrészeket és át vált a test berajzolására
  const saveMap = () =>{
    let newGrid = JSON.parse(JSON.stringify(grid));
    let fej = 0
    let test = 0
    let farok = 0
    let ko = 0

    newGrid.map((singleRow,index1)=>{
      singleRow.map((singleBlock,index2)=>{
        if(singleBlock.value === 1 ){
          fej++
        }
        if(singleBlock.value === 3 ){
          test++
        }
        if(singleBlock.value === 4 ){
          farok++
        }
        if(singleBlock.value === 2 ){
          ko++
        }
      })
    })
    if(fej === 1 && test === 1 && farok === 1 && ko > 0){
      
      setSavedBoard(newGrid);
      setBuildStade(1)
    }
    else{
      alert('ther can only be 1 of every body part and there has to be one of every bodypart and there must be at least one stone')
      
    }

    
  }


  const submitMap = () =>{
  //testrészek és kövek mentése
    let stones = ''
    let parts = ''
    let head = ''
    let body = ''
    let tail = ''
    savedBoard.map((singleRow,index1)=>{
      singleRow.map((singleBlock,index2)=>{
        if(singleBlock.value === 2 ){
          stones = stones + index1 + ',' + index2 + ','
        }
        if(singleBlock.value === 1 ){
          head = head + index1 + ',' + index2 + ','
        }
        if(singleBlock.value === 3 ){
          body = body + index1 + ',' + index2 + ','
        }
        if(singleBlock.value === 4 ){
          tail = tail + index1 + ',' + index2 + ','
        }
      })
    })
    parts = head + body + tail
    //le vesszük az utolso vesszőt a strindről 
    parts = parts.slice(0, -1);
    stones = stones.slice(0, -1);
//oldalak számolása
  //jobb oldal
    let right = []
    let bottom = []
    savedBoard.map((singleRow,index1)=>{
      let counter = 0;
      singleRow.map((singleBlock,index2)=>{
        if(grid[index1][index2].value === 5 || grid[index1][index2].value === 1){
          counter++;
        }
      })
      right.push(counter);
    })
   

  //bal oldal
    if(grid.length>1){
      for(let i = 0; i < width;i++){
        let colCount = 0; 
        for(let j = 0; j < height;j++){
          if(grid[j][i].value === 1||grid[j][i].value === 5){
            colCount++;
           } 
        }
        bottom.push(colCount);
      }
      
    }
  //oldalak stringé alakítása  
//map mentése
    Axios.post("http://localhost:3001/api/insertMap",{
      name:palyaneve,
      width:width,
      height:height,
      parts:parts,
      stones:stones,
      right:right.toString(),
      bottom:bottom.toString(),
      uploaded_by:user.username,
  }).then(()=>{
  });
  };
 //routing
 const toHome = () =>{
   alert('success')
  history.push('/')
 }
 const toGame =()=>{
   alert('success')
  setTimeout(function (){
  Axios.get(`http://localhost:3001/api/loadSavedMap`).then((response) =>{
    setChosenMap(response.data[0].id)   
  })
  }, 1200);
  setTimeout(function (){
  console.log(chosenMap)
  history.push('/Game')
  }, 2500);
  }

//rendelelés
//map méret bekérés
  if(activeCard === 0){
  return (
    <div className='create'>
      <div className='form' >
      
      <div className='container'>
       <input type="number" autoComplete="off" name="width" placeholder="Hidth" onChange={event => setWidth(event.target.value)} />
       </div>

       <div className='container'>
       <input type="number" autoComplete="off" name="height" placeholder="Height" onChange={event => setHeight(event.target.value)} />
       </div>

       <div className='container'>
       <input type="text" autoComplete="off" name="height" placeholder="Map name" onChange={event => setPalyaNeve(event.target.value)} />
       </div> 
        <div className='container'>
        <button className='gomb' onClick={() => { setActiveCard(1) } }>Done</button>
        </div>
      </div>
       
    </div>
  )
  }
//kövek és test részek be rajzolása
  return( 
    
    <div className='create'>
      
    <div>
      {
        grid.map((singleRow,index1)=>{
          return <div style={{display: "flex"}} key={index1}>{
           singleRow.map((singleBlock,index2)=>{
         return <CreatorTile details={singleBlock} tileClick={tileClick} tileRightClick={tileRightClick} key={index2}/>
      })
      }
       
          </div> 
        })
        
      }
      
      {buildStade === 0
      ? <div className='createDoboz'>
        
          <div >
            <button className='createGomb' onClick={() =>setBodyPart(1)}>Head</button>
            <button className='createGomb' onClick={() =>setBodyPart(3)}>Body</button>
            <button className='createGomb' onClick={() =>setBodyPart(4)}>Tail</button>
            <button className='createGomb' onClick={() =>setBodyPart(0)}>Delete</button>
          </div>
          <div className='createDoboz2'>
          <div >
            <button className='createGomb' onClick={() =>{saveMap();setBodyPart(5)}}>draw the snake</button>
            <p style={{marginTop: "20px"}}>use right click for the stones</p>
          </div>
          </div>
        </div>
     
    
     : <div className='createDoboz3'>
      <button className='createGomb' onClick={() =>{toHome();submitMap()}}>save map</button>
      <button className='createGomb' onClick={() =>{submitMap();toGame()}}>save map and play</button>
      </div>
      }

    </div>
    </div>
  )
}

export default Create;
