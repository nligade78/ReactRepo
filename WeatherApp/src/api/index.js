const baseURL=
"https://api.weatherapi.com/v1/current.json?key=f66311944cee48869db85624250911";

export const getWeatherDataForCity = async (city) =>{
   const response = await fetch(`${baseURL}&q=${city}&aqi=yes`);
   return await response.json();
}