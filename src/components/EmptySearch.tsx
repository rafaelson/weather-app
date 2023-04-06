import SearchBar from "./SearchBar";
import SearchBarProps from "../interfaces/SearchBarProps";

export default function EmptySearch(props: SearchBarProps) {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        height: "180px",
        width: "680px",
        borderRadius: "55px",
        background: "linear-gradient(0deg, #000000, #000000), #000000",
        opacity: "80%",
        fontFamily: "Poppins",
        fontStyle: "normal",
      }}
    >
      <div
        css={{
          width: "620px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <SearchBar
          fetchWeather={props.fetchWeather}
          weatherData={props.weatherData}
        />
      </div>
    </div>
  );
}
