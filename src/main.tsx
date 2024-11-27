import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import NoPage from "./components/noPage/NoPage";
import Layout from "./layout/Layout";
import Weather from "./components/weather/Weather";
import { WeatherProvider } from "./context/weatherContext";

createRoot(document.getElementById("root")!).render(
  <WeatherProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="weather" element={<Weather />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </WeatherProvider>
);
