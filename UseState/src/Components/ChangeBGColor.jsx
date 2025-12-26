import React, {  useState } from 'react'

function ChangeBGColor() {
    const [color,setColor]=useState("");
  return (
    <div style={{backgroundColor:color,height:"100vh",padding:"20px"}}>
            {/* <h1>{color}</h1> */}
            <button onClick={()=>setColor("RED")}>Red</button>
            <button onClick={()=>setColor("GREEN")}>Green</button>
            <button  onClick={()=>setColor("BLUE")}>Blue</button>
    </div>
  )
}

export default ChangeBGColor
