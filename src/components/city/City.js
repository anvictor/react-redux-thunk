import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {addCityName} from './citySlice';
import './City.css';


export function City(props) {
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState('');
  
  

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
              dispatch(addCityName(String(cityName) || "Жмеринка"))
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
