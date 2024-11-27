import { useWeather } from "../../context/weatherContext";
import styles from "./weather.module.css"

export default function Weather() {

  const { weatherData, setWeatherData } = useWeather();

  console.log(weatherData);

  return (
    <>
      <div className="lesson-container">
        <h4>States:</h4>
      
      {weatherData.name ? (
        <>
          <div className={styles.weather}>
            <p>State is {weatherData.name}</p>
            <p>Timezone is {weatherData.timezone}</p>
            <p>Temp is {weatherData.main.temp}</p>
          </div>
        </>
      ) : (
        <>
          <div className={styles.weather}>
            {weatherData?.cod === "404" ? "😫 city not found" : ""}
          </div>
        </>
      )}
      </div>
    </>
  );
}
