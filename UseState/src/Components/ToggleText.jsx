import React, { useState } from "react";

const ToogleText = () =>{
    const [isVisible, setIsVisible]=useState(true);

    const handleToggle=()=>{
        setIsVisible(!isVisible);
    }

    return(
      <div style={{padding:'20px'}}>
        <button onClick={handleToggle}>
            {isVisible ? "Show" : "Hide"}
        </button>
      </div>
    )
}

export default ToogleText;