import React,{useEffect, useState, useContext} from 'react'
import createBoard from '../createBoard';
import Tile from './Tile'
import Cell from './Cell'
import BottomCells from './BottomCells';
import { ChosenMap } from '../ChosenMap';
import Axios from "axios";
import '../../App.css'
import Mestint from '../Mestint';
const Board = () => {
  const {chosenMap, setChosenMap} = useContext(ChosenMap);
  const [grid,setGrid] = useState([]);
  const [lastPos,setLastPos] = useState([0,0]);
  const [BottomSide,setBottomSide] = useState([0]);
  const [rightSide,setRightSide] = useState([0]);
  const [teste,setTeste]=useState(0);

  const [aiBoard,setAIBoard] = useState([]);
  const [aiLastPos,setAiiLastPos] = useState([]);
//létre hozzuk a boardot
  useEffect(() =>{
    let width = 5
    let height = 5
    let parts = "0,0,0,1,0,2,"
    let stones = "1,0,1,2,1,4,3,0,"
    let right = "3,0,0,0,0"
    let bottom = "1,1,1,0,0"
    function mapGetter(){
      Axios.get(`http://localhost:3001/api/loadMap/${chosenMap}`).then((response) =>{
      width = response.data[0].width
      height = response.data[0].height
      parts = response.data[0].parts
      stones = response.data[0].stones
      right = response.data[0].rightS
      bottom = response.data[0].bottom

      function freshBoard(){
        const newBoard = createBoard(width, height, parts, stones, right, bottom);
        setAIBoard(newBoard);
        setGrid(newBoard.board);
        setBottomSide(newBoard.bottom);
        setRightSide(newBoard.right);

        function getStarterPos(){
         newBoard.board.map((singleRow,index1)=>{ 
          singleRow.map((singleBlock,index2)=>{ 
           if(singleBlock.value === 1){
             setLastPos([index1,index2])
             setAiiLastPos([index1,index2])
           }
          })
         })


        }getStarterPos();
      }freshBoard();
      }); 
    }mapGetter();
    
  }, []);
  
  const megoldasE = () =>{
    let rightCount = 0;
    let bottomCount = 0;
    let bodypartCount = 0;
    //oldalsó check
    grid.map((singleRow,index1)=>{   
      let rowCount = 0; 
        singleRow.map((singleBlock,index2)=>{
         if(singleBlock.value === 1){
          rowCount++;
         } 
        })
      if(rowCount === rightSide[index1]){
        rightCount++;
      }
    })
    //alsó check
    if(BottomSide.length>1){
      for(let i = 0; i < BottomSide.length;i++){
        let colCount = 0; 
        for(let j = 0; j < rightSide.length;j++){
          if(grid[j][i].value === 1){
            colCount++;
           } 
        }
        if(colCount === BottomSide[i]){
          bottomCount++;
        }
      }
    }
    //testresz check
    grid.map((singleRow,index1)=>{   
        singleRow.map((singleBlock,index2)=>{
         if(singleBlock.value === 3){
          bodypartCount++
         } 
         if(singleBlock.value === 4){
          bodypartCount++
         } 
        })
      
    })
    if( rightCount === rightSide.length && bottomCount === BottomSide.length && bodypartCount === 0){
      alert('win')
    }
  }
  

  //mezőre kattintás
  const tileClick = (x,y) =>{
    let newGrid = JSON.parse(JSON.stringify(grid));
    let elozo = lastPos;
    if(x === elozo[0]){
    if(newGrid[x][y].value === 0 || newGrid[x][y].value === 3 || newGrid[x][y].value === 4 ){
      if(teste === 0){
        if(y + 1 === elozo[1] || y - 1 === elozo[1]){
          newGrid[x][y].value = 1;
          elozo[1] = y;
          setGrid(newGrid);     
        }
      }
      if(teste === 1){
        if(y + 1 === elozo[1] || y - 1 === elozo[1]){
          newGrid[x][y].value = 1;
          elozo[1] = y;
          setGrid(newGrid);     
        }
      }
    }
  }
  if( y === elozo[1]){
    if(newGrid[x][y].value === 0 || newGrid[x][y].value === 3 ||newGrid[x][y].value === 4 ){
      if(x + 1 === elozo[0] || x - 1 === elozo[0]){
        newGrid[x][y].value = 1;
        elozo[0] = x;
        setGrid(newGrid);
    }   
    }
    setLastPos(elozo);
  }
  }
//Mestint
const solver = (x,y) =>{
  let megoldas = Mestint(aiBoard,aiLastPos)
  console.log(megoldas.megoldas.board)
  console.log(grid)
  if(megoldas !== null){
    setGrid(megoldas.megoldas.board)
  }
}
//renderelés
    return ( <div>
    {
      
    grid.map((singleRow,index1)=>{
      return <div style={{display: "flex"}} key={index1}>{
        singleRow.map((singleBlock,index2)=>{
          return <Tile details={singleBlock} tileClick={tileClick} key={index2}/>;
        })
      }
           <Cell value={rightSide[index1]}/>    
      </div>
      
      
    })
    
    }
    <BottomCells values={BottomSide}/>
    <div className='container'>
      <button className='gomb' onClick={megoldasE}>Check</button>
    </div>
    <div className='container'>
      <button className='gomb' onClick={solver}>Solve with AI</button>
    </div>
    </div>
    )
}


export default Board;