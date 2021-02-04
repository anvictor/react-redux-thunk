import React, {useState, useEffect} from 'react';
import {apiFetchWeatherData} from './app/apimetods';
import {weatherConditioner} from './app/weatherConditioner'
import { City } from './components/city/City.js';
import { Weather } from './components/weather/Weather';
import {useSelector, useDispatch} from 'react-redux';
import {selectCity} from './components/city/citySlice';
import {addWeatherData, selectWeather} from './components/weather/weatherSlice';
import './App.css';

function App() {
  const city = useSelector(selectCity);
  const weather = useSelector(selectWeather);
  const dispatch = useDispatch();
  const [errormessage, setErrormessage] = useState("init")
  useEffect(() => {
    if(city !=="init"){
      apiFetchWeatherData (city)
      .then(res=>{
        const weatherData =  weatherConditioner(res)
        dispatch(addWeatherData(weatherData))

    })
      .catch(error=>{
        console.log("error", "City name not found or exceeded the limit of calls")
        setErrormessage("City name not found or exceeded the limit of calls")
      })
    }
    return () => {
  // clear    
    }
  }, [city])
  const clickHandler = () =>{
    setErrormessage("init")
  }

  console.log("weather",weather);
  return (
    <div className="App">
      {errormessage !=="init" && <span className="errormessage">{errormessage}</span>}
     <City 
      clickHandler={clickHandler}
      errormessage={errormessage}
     />
     {weather !== "init" && <Weather 
      weather={weather.data}
     />}
    </div>
  );
}

export default App;
