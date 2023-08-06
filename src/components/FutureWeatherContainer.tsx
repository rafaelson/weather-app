import FutureWeatherDay from "./FutureWeatherDay";
import FutureWeatherProps from "../interfaces/FutureWeatherProps";
import { useState } from "react";

export default function FutureWeatherContainer(props: FutureWeatherProps) {
  const [buttonState, setButtonState] = useState("Hourly");

  const returnWeathers = () => {
    const weathers = [];

    if (buttonState === "Hourly") {
      for (let i = 0; i < 5; i++) {
        weathers[i] = (
          <FutureWeatherDay
            key={i}
            weatherData={props.weatherData.future?.list![i]!}
            forecastType="hourly"
          />
        );
      }
    } else {
    }

    return weathers;
  };

  const interchangeButtonState = () => {
    if (buttonState === "Hourly") setButtonState("Daily");
    else setButtonState("Hourly");
  };

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
          onClick={interchangeButtonState}
        >
          {buttonState}
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
        {/* <FutureWeatherDay />
        <FutureWeatherDay />
        <FutureWeatherDay />
        <FutureWeatherDay />
        <FutureWeatherDay /> */}
        {returnWeathers()}
      </div>
    </div>
  );
}
