function weatherConditioner(data) {
    console.log("data", data);
    const nowLocal = new Date();
    const localTimeZone = nowLocal.getTimezoneOffset()*60
    const timeZoneShift = (data.data.city.timezone + localTimeZone)/60/60
    const justForecast = data.data.list
    const firstDate = new Date(justForecast[0].dt_txt)
    const firstDataHours = firstDate.getHours()
    
    // according the earth timezone, City`s 00.00 not equal local 00.00 time
    let closestNightIndexPredict = 8 - firstDataHours / 3 + Math.trunc(timeZoneShift/3);
    let closestNightIndexReal = closestNightIndexPredict === 8?0:closestNightIndexPredict;
    let conditionedData=[];

    for(let i=0; i<5;i++){
        let nightWeekDay = new Date(justForecast[closestNightIndexReal+i*8].dt_txt)
        let nightDate = (new Date(justForecast[closestNightIndexReal+i*8].dt_txt)).getDate()
        conditionedData.push({
            name: `${nightDate} ${nightWeekDay.toLocaleDateString("EN", { weekday: 'long' })}`,
            night: justForecast[closestNightIndexReal+i*8].main.temp,
            day: justForecast[closestNightIndexReal+i*8+4].main.temp
        })
    }
        return {
            status: "ok",
            data: conditionedData
        }
      }
     

export {weatherConditioner}
