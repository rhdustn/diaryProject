import React from 'react'

const WeatherItem = (weather_id,weather_img,weather_name) => {
  return (
    <div>
        <img src={weather_img}/>
        <span>{weather_name}</span>
    </div>
  )
}

export default WeatherItem