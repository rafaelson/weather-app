import CurrentWeatherInfoProps from "../interfaces/CurrentWeatherInfoProps";

export default function CurrentWeatherInfo(props: CurrentWeatherInfoProps) {
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
        Weather in Resende
      </span>
      <span css={{ fontWeight: 800, fontSize: "50px", lineHeight: "35px" }}>
        30ºC
      </span>
      <span css={{ fontWeight: 600, fontSize: "30px", lineHeight: "45px" }}>
        feels like 32ºC
      </span>
      <span css={{ fontWeight: 500, fontSize: "20px", lineHeight: "30px" }}>
        <span
          css={{ fontSize: "30px", marginRight: "10px" }}
          className="wi wi-owm-night-802"
        ></span>
        Cloudy
      </span>
      <span css={{ fontWeight: 500, fontSize: "20px", lineHeight: "30px" }}>
        Humidity: 45%
      </span>
      <span css={{ fontWeight: 500, fontSize: "20px", lineHeight: "30px" }}>
        Wind Speed: 3.4 km/h
      </span>
    </div>
  );
}
