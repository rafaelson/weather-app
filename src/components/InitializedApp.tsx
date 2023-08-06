import SearchBarProps from "../interfaces/SearchBarProps";
import SearchBar from "./SearchBar";
import CurrentWeatherInfo from "./CurrentWeatherInfo";
import FutureWeatherContainer from "./FutureWeatherContainer";

export default function InitializedApp(props: SearchBarProps) {
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
        <SearchBar
          fetchWeather={props.fetchWeather}
          weatherData={props.weatherData}
        />
        <CurrentWeatherInfo weatherData={props.weatherData} />
        <FutureWeatherContainer weatherData={props.weatherData} />
      </div>
    </div>
  );
}
