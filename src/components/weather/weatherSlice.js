import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {apiFetchWeatherData} from '../../app/apimetods'
import {weatherConditioner} from '../../app/weatherConditioner'


// First, create the thunk
export const fetchWeatherByCity = createAsyncThunk(
  'fetchWeatherByCity',
  async (cityName) => {
    console.log("fetchWeatherByCity", cityName);
    const {data} = await apiFetchWeatherData(cityName)


  const weather = weatherConditioner(data)
  return weather
  }
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {

    value: [
      {
        day: 1,
        name: "Mock Sun",
        night: -1,
      },
      {
        day: 2,
        name: "Mock Mon",
        night: -2
      },
      {
        day: 3,
        name: "Mock Tue",
        night: -3
      },
      {
        day: 4,
        name: "Mock Wed",
        night: -4
      },
      {
        day: 5,
        name: "Mock Thu",
        night: -5
      }
    ]
  },
  reducers: {
   
    addWeatherData: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchWeatherByCity.fulfilled]: (state, action) => {
      console.log("action", action);
      // Add user to the state array
      state.value=action.payload
      console.log("state",state);
    }
  }
});


export const {  addWeatherData } = weatherSlice.actions;

export const selectWeather = state =>{
  return state.weather.value;
} 

export default weatherSlice.reducer;
