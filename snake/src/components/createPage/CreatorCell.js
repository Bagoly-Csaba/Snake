import React from 'react'


const Cell = ({details,CellChange}) => {
  return( 
  <div style={style.cellStyle}>
    <input 
    type='number' 
    style={style.inputStyle } 
    value={details} 
    onChange={(e) => { console.log(e.target.details)}}
    >
    </input>
  </div>
    
  )
};
const style = {
  cellStyle:{
    width:40, height:40, background: "lightgrey",
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    border: '1px solid black'  ,
    overflow: 'hidden'
  },
  inputStyle:{
    width:'100%',
    height:'100%'
  }
}
export default Cell