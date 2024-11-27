import { createContext, useContext, useEffect, useState } from "react";
import { IWeatherData } from "../components/homePage/HomePage";

export const initial: IWeatherData = {
  coord: {
    lon: 0,
    lat: 0
  },
  weather: [],
  base: "",
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    sea_level: 0,
    grnd_level: 0
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0
  },
  clouds: {
    all: 0
  },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    country: "",
    sunrise: 0,
    sunset: 0
  },
  timezone: 0,
  id: 0,
  name: "",
  cod: ""
}

interface IWeatherContextType {
  weatherData: IWeatherData
  setWeatherData: React.Dispatch<React.SetStateAction<IWeatherData>>
}


export const WeatherContext = createContext<IWeatherContextType | undefined>(undefined);


export const WeatherProvider = ({children}: {children: React.ReactNode}) => {
  const [weatherData, setWeatherData] = useState<IWeatherData>(initial);

  

  return (
    <WeatherContext.Provider value={{weatherData, setWeatherData}}>
      {/* за место children придут обернутые в provider компоненты */}
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeather = () => {
  const context = useContext(WeatherContext)
  if(!context) {
    throw new Error("no such context!😮")
  }
  return context;
}