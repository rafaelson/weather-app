import "@fontsource/poppins";
import "./assets/css/weather-icons.css";
import SearchBar from "./components/SearchBar";
import FutureWeatherContainer from "./components/FutureWeatherContainer";
import CurrentWeatherInfo from "./components/CurrentWeatherInfo";
import { useState } from "react";
import { getCode, getName } from "country-list";
import {
  Convert,
  CurrentWeatherObject,
} from "./interfaces/CurrentWeatherObject";

export interface WeatherData {
  current?: CurrentWeatherObject;
  future?: any;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    current: undefined,
    future: undefined,
  });

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
    setWeatherData({
      current: Convert.toCurrentWeatherObject(
        JSON.stringify(await weather.json())
      ),
      future: undefined,
    });
  };

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        height: "724px",
        width: "760px",
        borderRadius: "55px",
        background: "linear-gradient(0deg, #000000, #000000), #000000",
        opacity: "80%",
        fontFamily: "Poppins",
        fontStyle: "normal",
      }}
    >
      <div
        css={{
          height: "584px",
          width: "620px",
          marginTop: "70px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <SearchBar fetchWeather={fetchWeather} weatherData={weatherData} />
        <CurrentWeatherInfo weatherData={weatherData} />
        <FutureWeatherContainer />
      </div>
    </div>
  );
}

export default App;
