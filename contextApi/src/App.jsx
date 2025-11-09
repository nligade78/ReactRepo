import  {useContext} from 'react'
import Counter from './components/Counter'
import './App.css'
import { CounterContext } from './Context/Counter'
function App() {
  const counterState= useContext(CounterContext);

  console.log("Context",counterState);
  return(
    <div> 
      <h1>Counter is 0{counterState.count} </h1>
      <Counter/>
    </div>
  )
}

export default App
