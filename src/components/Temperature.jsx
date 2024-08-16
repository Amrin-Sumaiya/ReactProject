import React, { useEffect,useRef, useState } from 'react'
import './temprature.css'
import search_icon from '../assets/search.png'
import sunny_icon from '../assets/sun4.png'
import CloudRain_icon from '../assets/Cloud-Rain.png'
import rain_icon from '../assets/rain.png'
import suncloud_icon from '../assets/sun-cloud.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity2.png'

const Temperature = () => {

const inputRef = useRef()
  const [temperatureData, setTemperatureData] = useState({});
  const [error, setError] = useState('');

  const allIcons = {
    "01d": sunny_icon,
    "01n": sunny_icon,
    "02d": suncloud_icon,
    "02n": suncloud_icon,
    "03d": rain_icon,
    "03n": rain_icon,
    "04d": CloudRain_icon,
    "04n": CloudRain_icon,
    "09d": humidity_icon,
    "09n": humidity_icon,
    "10d": wind_icon,
    "10n": wind_icon,
    "13d": snow_icon,
    "13n": snow_icon,

  }

  const search = async (city) => {

    if(city.trim === ""){
      setError("Enter City Name");
      return;
    }
    setError(''); 
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c269aafc7d8c4a742abcc321b325ff3e`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200){
        setError("City not found");
        setTemperatureData({});
        return;
      }
     
      console.log("temperatureData",data);
    
      setTemperatureData(data)

    } catch (error) {

      console.error('Error fetching weather data:', error);
      setError("Failed to fetch weather data");

    }

  };

  useEffect(() => {

    search("China");
  }, []);

  const iconCode = temperatureData?.weather?.[0]?.icon;
  const icon = allIcons[iconCode] || snow_icon;


  return (
    <div className='Temperature'>
      <div className="search-bar">
      <input
          ref={inputRef}
          type="text"
          placeholder={error ? error: 'Search'}
          className={error ? 'error' : ''}
        /> 
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        {error && <p className="error-message">{error}</p>}
       
      </div>
      <img src={icon} alt="Weather Icon" className='Temperature-icon' />
      <p className='temperature'>{temperatureData?.main?.temp}°c</p>
      <p className='location'>{temperatureData?.name}</p>
      <div className="temperature-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
        </div>
        <p>{temperatureData?.main?.humidity}</p>
        <span> Humidity </span>

        <div className="col">
          <img src={wind_icon} alt="" />
        </div>
        <p>{temperatureData?.wind?.deg}</p>
        <span> Wind speed </span>

      </div>
    </div>


  )
}

export default Temperature
