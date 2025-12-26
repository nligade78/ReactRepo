import React, { useState } from 'react'

function CounterButton() {
  const [count,setCount]=useState(0);
  return (
    <div>
          <div>
              Counter Button App

               <h1>Count is {count}</h1>
          </div>

        <button onClick={()=>setCount(count+1)}>Increment +</button>
        <button onClick={()=>setCount(count-1)}>Decrement -</button>
        <button onClick={()=>setCount(0)}>Reset</button>
    </div>
  )
}

export default CounterButton
