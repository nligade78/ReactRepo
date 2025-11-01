import React from "react";
import { useState } from "react";
const CounterComponent = () => {
    const [count,SetCount]=useState(0);
    console.log(count);
    return(
            <div>
              
                <h1>Counter Component</h1>
                <h1>{count}</h1>
                <button onClick={()=> SetCount(count+1)}>Counter Increment</button>
                <button onClick={()=> SetCount(count-1)}>Counter Decrement</button>
                <h1>Number is {  count % 2==0 ? "even Number":"Odd Number"}</h1>
            </div>
            
    );
}
export default CounterComponent;