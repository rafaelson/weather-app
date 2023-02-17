import "@fontsource/poppins";
import "./assets/css/weather-icons.css";
import SearchBar from "./components/SearchBar";
import FutureWeatherContainer from "./components/FutureWeatherContainer";
import CurrentWeatherInfo from "./components/CurrentWeatherInfo";
import { useState } from "react";

interface Weather {
  current?: object;
  future?: object;
}

export interface WeatherProps {
  weatherData: Weather;
  setWeatherData: any;
}

function App() {
  const [weatherData, setWeatherData] = useState<Weather>({
    current: undefined,
    future: undefined,
  });

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
        <SearchBar weatherData={weatherData} setWeatherData={setWeatherData} />
        <CurrentWeatherInfo />
        <FutureWeatherContainer />
      </div>
    </div>
  );
}

export default App;
