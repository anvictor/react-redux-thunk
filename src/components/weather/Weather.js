import React from 'react';
import {
  BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


export function Weather (forecast){
  
    return (
      <BarChart
        width={1000}
        height={300}
        data={forecast.weather}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="night" fill="#8884d8" />
        <Bar dataKey="day" fill="#82ca9d" />
      </BarChart>
    );
}
