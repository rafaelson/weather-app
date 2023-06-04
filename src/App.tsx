import "@fontsource/poppins";
import "./assets/css/weather-icons.css";
import { useState } from "react";
import { getCode, getName } from "country-list";
import { Convert } from "./interfaces/WeatherObjects";
import WeatherData from "./interfaces/WeatherData";
import EmptySearch from "./components/EmptySearch";
import InitializedApp from "./components/InitializedApp";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    current: undefined,
    future: undefined,
  });

  const init = () => {
    if (weatherData.current) {
      return (
        <InitializedApp fetchWeather={fetchWeather} weatherData={weatherData} />
      );
    } else {
      return (
        <EmptySearch fetchWeather={fetchWeather} weatherData={weatherData} />
      );
    }
  };

  const fetchWeather = async (search: string, splitSearch: string[]) => {
    const apiKey = "2d6d5dcae015b67de90985989421c864";
    let weather: Response;

    if (getCode(splitSearch[splitSearch.length - 1])) {
      let country = getCode(splitSearch[splitSearch.length - 1])!;
      weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search.replace(
          country,
          ""
        )},${country}&appid=${apiKey}`,
        { mode: "cors" }
      );
    } else if (getName(splitSearch[splitSearch.length - 1])) {
      let country = splitSearch[splitSearch.length - 1];
      weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search.replace(
          country,
          ""
        )},${country}&appid=${apiKey}`,
        { mode: "cors" }
      );
    } else {
      weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`,
        { mode: "cors" }
      );
    }

    if (weather.ok) {
      setWeatherData({
        current: Convert.toCurrentWeatherObject(
          JSON.stringify(await weather.json())
        ),
        future: undefined,
      });
    } else {
      alert("Error, please reload the page.");
    }
  };

  return init();
}

export default App;
