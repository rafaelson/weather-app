export default function FutureWeatherDay() {
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
      <span>Wed</span>
      <span>15º/20º</span>
      <span css={{ fontSize: "50px" }} className="wi wi-owm-night-802"></span>
      <span>Rain: 0%</span>
      <span>Humidity: 55%</span>
    </div>
  );
}
