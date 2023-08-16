import SearchBarProps from "../interfaces/SearchBarProps";
import SearchBar from "./SearchBar";
import CurrentWeatherInfo from "./CurrentWeatherInfo";
import FutureWeatherContainer from "./FutureWeatherContainer";

export default function InitializedApp(props: SearchBarProps) {
  const checkIfNight = () => {
    const sunriseUnix = props.weatherData.current?.sys?.sunrise!;
    const sunsetUnix = props.weatherData.current?.sys?.sunset!;
    const currentUnixTime = Math.floor(new Date().getTime() / 1000);

    if (currentUnixTime < sunsetUnix && currentUnixTime > sunriseUnix) {
      return "day";
    } else return "night";
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
        <SearchBar
          fetchWeather={props.fetchWeather}
          weatherData={props.weatherData}
        />
        <CurrentWeatherInfo
          weatherData={props.weatherData}
          checkIfNight={checkIfNight}
        />
        <FutureWeatherContainer
          weatherData={props.weatherData}
          checkIfNight={checkIfNight}
        />
      </div>
    </div>
  );
}
