import React from 'react';
import CreatorCell from './CreatorCell'

export default function BottomCells({values}) {
  console.log('e' + values)
  return (
    <div style={{display: "flex"}}>
        { 
            values.map((value, index1)=>{
            return <CreatorCell details={value} index={index1}/>;
            })
        }
    </div>
  )
}
