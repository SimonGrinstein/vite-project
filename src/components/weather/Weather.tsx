import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import styles from "./weather.module.css";

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

const initial: IWeatherData = {
  coord: {
    lon: 0,
    lat: 0,
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
    grnd_level: 0,
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0,
  },
  clouds: {
    all: 0,
  },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    country: "",
    sunrise: 0,
    sunset: 0,
  },
  timezone: 0,
  id: 0,
  name: "",
  cod: "",
};

export default function Weather() {

  const [weatherData, setWeatherData] = useState<IWeatherData>(initial);

  const fetchGender = async (name: string) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=355548bf7a071b0b0eb5dd6303929c7d`
    );
    const data = await res.json();
    console.log(data);
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
      fetchGender(values.name);
    },
  });

  return (
    <div className="lesson-container">
      <h5>Your state</h5>

      <form className={styles.genderForm} onSubmit={formik.handleSubmit}>
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
          <div>
            <p>State is {weatherData.name}</p>
            <p>Timezone is {weatherData.timezone}</p>
            <p>Temp is {weatherData.main.temp}</p>
          </div>
        </>
      ) : (
        <>
          <p>{weatherData?.cod === "404" ? "😫 city not found" : ""} </p>
        </>
      )}
    </div>
  );
}
