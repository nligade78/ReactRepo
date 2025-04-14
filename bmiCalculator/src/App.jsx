import { useState } from 'react'
import './App.css'
import BmiCalculator from './components/BmiCalculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BmiCalculator />
    </>
  )
}

export default App
