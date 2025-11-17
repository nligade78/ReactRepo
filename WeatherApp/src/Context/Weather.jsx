import { createContext, useContext, useState } from "react";
import { getWeatherDataForCity } from "../api";
const WeatherContext = createContext(null);

export const useWeather = () =>{
 return useContext(WeatherContext);
}

export const WeatherProvider = (props) =>{

    const [data,setData] = useState(null);
    const [searchCity, setSearchCity]=useState(null);

const fetchdata = async () =>{
    const response= await getWeatherDataForCity(searchCity);
     setData(response);
};

const fetchCurrentUserLocationData = ()=>{
   navigator.geolocation.getCurrentPosition((position)=>{
    console.log(position);
   });
};

    return <WeatherContext.Provider value={{searchCity,data,setSearchCity,fetchdata}}>{props.children}</WeatherContext.Provider>
};