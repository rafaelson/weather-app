import FutureWeatherDayProps from "../interfaces/FutureWeatherDayProps";

export default function FutureWeatherDay(props: FutureWeatherDayProps) {
  const kelvinToCelsius = (kelvinTemp: number) =>
    Math.round(kelvinTemp - 273.15);
  const defineForecastType = () => {
    if (props.forecastType === "hourly") {
      return `${props.weatherData.dtTxt?.getHours()}:00`;
    }
  };

  return (
    <div
      css={{
        width: "124px",
        height: "145px",
        color: "#F9F9F9",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>{defineForecastType()}</span>
      <span>{kelvinToCelsius(props.weatherData.main?.temp!)}ºC</span>
      <span
        css={{ fontSize: "50px" }}
        className={`wi wi-owm-night-${props.weatherData.weather![0].id}`}
      ></span>
      <span>
        Rain:{" "}
        {props.weatherData.rain?.the3H
          ? `${props.weatherData.rain?.the3H}mm`
          : "0mm"}
      </span>
      <span>Humidity: {props.weatherData.main?.humidity}%</span>
    </div>
  );
}
