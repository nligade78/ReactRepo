import React from 'react'

function Counter() {
    const[count, setCount] = React.useState(0)
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);
  return (
    <div className='container'>
        <h1>Counter</h1>
        <span > {count}</span>
        <div className='counter'>
          
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>Reset</button>
        </div>
    </div>
  )
}

export default Counter