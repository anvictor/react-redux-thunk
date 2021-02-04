import axios from 'axios'

      function apiFetchWeatherData(city) {
        const q = city && city;
        const units = "metric";
        const cnt = 17*24
        const appid="53a2d481fe16e1130c7ff78d15f844d4"
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${q}&units=${units}&cnt=${cnt}&appid=${appid}`;

        return new Promise((resolve, reject) => {
            resolve(axios.get(url))
            reject(error => console.log("error", error))
        })
      }
     

export {apiFetchWeatherData}

