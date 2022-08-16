import React from 'react'
import Cell from './Cell'

export default function BottomCells({values}) {
    ;
  return (
    <div style={{display: "flex"}}>
        {
            values.map((value,index1)=>{
            return <Cell value={value} key={index1}/>;
            })
            
        }
        <Cell/>
    </div>
  )
}
