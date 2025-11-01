import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Timer = () => {
    const [time,setTime]=useState(0);

    useEffect(()=>{
     const timer=  setInterval(() =>setTime(time + 1),1000);
        return function()
        {
            clearInterval(timer);
        }
    },[time])
   return (
    <div>
        <h1>StopWatch</h1>
        <p>Current Time is {time} </p>
    </div>
   )
}
export default Timer;