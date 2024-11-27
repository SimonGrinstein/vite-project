import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import styles from "./homePage.module.css";
import { useWeather } from "../../context/weatherContext";

export interface IWeatherForecast {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: IWeatherForecast[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };

  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };

  clouds: {
    all: number;
  };

  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };

  timezone: number;
  id: number;
  name: string;
  cod: string;
}

interface IFormData {
  name: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
    .typeError("город должен состоять из букв")
    .required("Поле обязательно к заполнению")
    .min(1, "город должен быть больше одного символа")
    .max(20, "Слишком большой город)))")
    .matches(/^[A-Za-z\s]+$/, "город должен содержать только буквы и пробелы"),
});


export default function HomePage() {
  const { weatherData, setWeatherData } = useWeather();

  const fetchWeather = async (name: string) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=355548bf7a071b0b0eb5dd6303929c7d`
    );
    const data = await res.json();
    //console.log(data);
    setWeatherData(data);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    } as IFormData,
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: (values: IFormData, { resetForm }) => {
      resetForm();
      fetchWeather(values.name);
    },
  });

  return (
    <div className="lesson-container">
      <h5>Your state</h5>

      <form className={styles.weatherForm} onSubmit={formik.handleSubmit}>
        <label className={styles.error}>{formik.errors.name}</label>
        <input
          placeholder="type your state"
          onChange={formik.handleChange}
          value={formik.values.name}
          name="name"
          type="text"
        />
        <button type="submit">send request</button>
      </form>

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
  );
}
