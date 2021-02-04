import { configureStore } from '@reduxjs/toolkit';
import cityReducer from '../components/city/citySlice';
import weatherReducer from '../components/weather/weatherSlice';

export default configureStore({
  reducer: {
    city: cityReducer,
    weather: weatherReducer
  },
});
