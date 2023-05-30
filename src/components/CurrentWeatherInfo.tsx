import CurrentWeatherInfoProps from "../interfaces/CurrentWeatherInfoProps";

export default function CurrentWeatherInfo(props: CurrentWeatherInfoProps) {
  const kelvinToCelsius = (kelvinTemp: number) =>
    Math.round(kelvinTemp - 273.15);
  const msToKmh = (ms: number) => Math.round(ms * 3.6);
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
        color: "#F9F9F9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        css={{
          fontWeight: 600,
          fontSize: "40px",
          lineHeight: "60px",
          marginBottom: "15px",
        }}
      >
        Weather in {props.weatherData.current?.name}
      </span>
      <span css={{ fontWeight: 800, fontSize: "50px", lineHeight: "35px" }}>
        {kelvinToCelsius(props.weatherData.current?.main?.temp!)}ºC
      </span>
      <span css={{ fontWeight: 600, fontSize: "30px", lineHeight: "45px" }}>
        feels like{" "}
        {kelvinToCelsius(props.weatherData.current!.main?.feelsLike!)}ºC
      </span>
      <span css={{ fontWeight: 500, fontSize: "20px", lineHeight: "30px" }}>
        <span
          css={{ fontSize: "30px", marginRight: "10px" }}
          className={`wi wi-owm-${checkIfNight()}-${
            props.weatherData.current?.weather![0].id
          }`}
        ></span>
        {props.weatherData.current?.weather![0].main}
      </span>
      <span css={{ fontWeight: 500, fontSize: "20px", lineHeight: "30px" }}>
        Humidity: {props.weatherData.current?.main?.humidity}%
      </span>
      <span css={{ fontWeight: 500, fontSize: "20px", lineHeight: "30px" }}>
        Wind Speed: {msToKmh(props.weatherData.current?.wind?.speed!)} km/h
      </span>
    </div>
  );
}
