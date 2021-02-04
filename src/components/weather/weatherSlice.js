import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    value: "init",
  },
  reducers: {
   
    addWeatherData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {  addWeatherData } = weatherSlice.actions;

export const selectWeather = state =>{
  return state.weather.value;
} 

export default weatherSlice.reducer;
