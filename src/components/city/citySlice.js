import { createSlice } from '@reduxjs/toolkit';

export const citySlice = createSlice({
  name: 'city',
  initialState: {
    value: "init",
  },
  reducers: {
   
    addCityName: (state, action) => {
      state.value = action.payload;
      console.log("addCityName state",state,'addCityName action',action);
    },
  },
});

export const {  addCityName } = citySlice.actions;

export const selectCity = state => state.city.value; 



export default citySlice.reducer;
