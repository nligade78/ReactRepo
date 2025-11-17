import { useEffect } from 'react'
import './App.css'
import Card from './Components/Card';
import Input from './Components/Input';
import Button from './Components/Button';
import { useWeather } from './Context/Weather';
function App() {
 const weather = useWeather();
 console.log(weather);

 useEffect(()=>{
  //get Current Location
 })
  return (
    
    <div className='App'>
     <h1>Weather App</h1>
      <Input/>
       <Button onClick={weather.fetchdata} value="Search"/>
      <Card/>
      <Button value="Refresh"/>
    </div>
  )
}

export default App
