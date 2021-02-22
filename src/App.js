import React, {useState, useEffect} from 'react';
import { City } from './components/city/City.js';
import { Weather } from './components/weather/Weather';
import {useSelector, useDispatch} from 'react-redux';
import {selectCity} from './components/city/citySlice';
import {selectWeather, fetchWeatherByCity} from './components/weather/weatherSlice';
import WeatherD3Chart from './components/weather/weatherD3Chart'
import './App.css';

function App() {
  const city = useSelector(selectCity);
  const weather = useSelector(selectWeather);
  const dispatch = useDispatch();
  const [errormessage, setErrormessage] = useState("init")

  useEffect(() => {
    if(city !=="init"){
      dispatch(fetchWeatherByCity(city));
    }
  
  }, [city, dispatch])

  const clickHandler = () =>{
    setErrormessage("init")
  }

  console.log("weather",weather);
  return (
    <div className="App">
      {city !=="init" && <span className="city">{city}</span>}
      {errormessage !=="init" && <span className="errormessage">{errormessage}</span>}
     <City 
      clickHandler={clickHandler}
      errormessage={errormessage}
     />
     { 
     // if not Mock then visible Chart
     !weather[0].name.includes('Mock')
      && <Weather 
      weather={weather}
     />}

     {/* { 
     // if not Mock then visible Chart
     !weather[0].name.includes('Mock')
      && <WeatherD3Chart 
      weather={weather}
     />} */}

    </div>
  );
}

export default App;
