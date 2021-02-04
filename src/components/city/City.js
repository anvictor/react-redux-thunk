import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {addCityName} from './citySlice';
import './City.css';
import {apiFetchWeatherData} from '../../app/apimetods';


export function City(props) {
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState('');
  console.log("props", props);
  
  

  return (
    <div>
      <div className="row">
        <input
        placeholder="input City"
          className="textbox"
          value={cityName}
          onChange={e => setCityName(e.target.value)}
        />
        <button
          className="button"
          onClick={() =>{
              dispatch(addCityName(String(cityName) || "empty"))
              apiFetchWeatherData(dispatch)
              props.clickHandler()
            }
          }
        >
          Search
        </button>
       
      </div>
    </div>
  );
}
