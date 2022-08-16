import React from 'react'


const Cell = ({value}) => {
  return( 
  <div  style={style.cellStyle}>
    {value}
  </div>
    
  )
};
const style = {
  cellStyle:{
    width:50, height:50, background: "#86b4c4",
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    border: '1px solid #20B2AA'
  }
}
export default Cell