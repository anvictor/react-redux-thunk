import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {apiFetchWeatherData} from '../../app/apimetods'
import {weatherConditioner} from '../../app/weatherConditioner'


// First, create the thunk
export const fetchWeatherByCity = createAsyncThunk(
  'fetchWeatherByCity',
  async (cityName) => {
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
        night: 4,
        day: 6,
        name: "Mock Sun",
      },
      {
        night: -7,
        day: -8,
        name: "Mock Mon",
      },
      {
        night: -9,
        day: -10,
        name: "Mock Tue",
      },
      {
        night: -11,
        day: -12,
        name: "Mock Wed",
      },
      {
        night: -13,
        day: -14,
        name: "Mock Thu",
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
      // Add user to the state array
      state.value=action.payload
    }
  }
});


export const {  addWeatherData } = weatherSlice.actions;

export const selectWeather = state =>{
  return state.weather.value;
} 

export default weatherSlice.reducer;
