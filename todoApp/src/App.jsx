import React from 'react';
import TodoComponent from './components/TodoComponent';
import CounterComponent from './CounterComponents/Counter';
import UseEffectComponent from './CounterComponents/UseEffectComponent';
import { useState } from 'react';
import { useEffect } from 'react';
import Timer from './CounterComponents/Timer';
function App() {
//  const [isVisible,setVisible]=useState(true);
//  useEffect(()=>{
//   // console.log("App Component");

//   return function(){
//     console.log("unmounting....");
//   }
//  },[])
  return (
    <div>
      {/* <TodoComponent/> */}
      {/* <CounterComponent/> */}
     {/* {isVisible ? <UseEffectComponent/> : <></>  }
      <button onClick={()=> setVisible(!isVisible)}>Toggle</button> */}
      <Timer/>
    </div>
  )
}

export default App
