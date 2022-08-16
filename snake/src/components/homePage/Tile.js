import React from 'react'

const Tile = ({details, tileClick}) => {
  return( 
  <div 
  onClick={() => tileClick(details.x,details.y)} 
  style={style.tileStyle}>
    {details.value}
  </div>
    
  )
};
const style = {
  tileStyle:{
    width:50, height:50, background: "#ADD8E6",
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    border: '1px solid #20B2AA'
  }
}
export default Tile