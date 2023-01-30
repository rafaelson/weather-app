/** @jsxImportSource @emotion/react */
import "@fontsource/poppins";
import "./assets/css/weather-icons.css";
// import "./static/font/weathericons-regular-webfont.woff";
// import './App.css';

function SearchBar() {
  return (
    <input
      type={"search"}
      placeholder={"Search"}
      css={{
        width: "620px",
        height: "80px",
        opacity: "50%",
        borderRadius: "55px",
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), #585858",
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "30px",
        lineHeight: "45px",
        paddingLeft: "15px",
        color: "rgba(255, 255, 255, 0.3)",
      }}
    ></input>
  );
}

function FutureWeatherDay() {
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

function FutureWeather() {
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

function CurrentWeatherInfo() {
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

function App() {
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
          // backgroundColor: "blue",
          marginTop: "70px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <SearchBar />
        <CurrentWeatherInfo />
        <FutureWeather />
      </div>
    </div>
  );
}

export default App;
