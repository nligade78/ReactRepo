import React from 'react'
import { useWeather } from '../Context/Weather'
function Card() {

  const weather = useWeather();
  return (
    <div className='card'>
       <img src={weather.data?.current?.condition.icon}/>
       <h2>{weather.data?.current?.temp_c}</h2>
       <h3>{weather.data.location?.country},{weather.data.location?.lat},{weather.data.location?.localtime},{weather.data.location?.name},{weather.data.location?.region}</h3>
    </div>
  )
}

export default Card
 