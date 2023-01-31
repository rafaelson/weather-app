import FutureWeatherDay from "./FutureWeatherDay";

export default function FutureWeatherContainer() {
  return (
    <div>
      <div css={{ display: "flex", flexDirection: "row-reverse" }}>
        <button
          css={{
            color: "#F9F9F9",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderColor: "#F9F9F9",
            borderRadius: "16px",
            fontFamily: "Poppins",
            borderWidth: "1px",
          }}
        >
          Hourly
        </button>
        {/* <button
            css={{
              color: "#F9F9F9",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderColor: "#F9F9F9",
              borderRadius: "16px",
              fontFamily: "Poppins",
              borderWidth: "1px",
            }}
          >
            Daily
          </button> */}
      </div>
      <div css={{ display: "flex" }}>
        <FutureWeatherDay />
        <FutureWeatherDay />
        <FutureWeatherDay />
        <FutureWeatherDay />
        <FutureWeatherDay />
      </div>
    </div>
  );
}
