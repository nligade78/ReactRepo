import React, { useEffect ,useState} from 'react';
const UseEffectComponent = ()=>{
    const [count,SetCount]=useState(0);

      useEffect(() => {
      console.log("My  Component is Mounting......")
    }, []);

    useEffect(()=>{
        console.log("Count got Update")
    },[count])

return(
    <div>
        <p>Count is {count}</p>
        <button onClick={()=> SetCount(count + 1)}>Update</button>
    </div>
)
}
export default UseEffectComponent;