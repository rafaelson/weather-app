import { useState } from "react";
import { getCode, getName } from "country-list";

export default function SearchBar() {
  const [searchBarOpacity, setSearchBarOpacity] = useState(0.3);
  const [searchBarValue, setSearchBarValue] = useState("");

  const fetchWeather = async (search: string, splitSearch: string[]) => {
    const apiKey = "2d6d5dcae015b67de90985989421c864";
    let weatherData: Response;

    if (getCode(splitSearch[splitSearch.length - 1])) {
      let country = getCode(splitSearch[splitSearch.length - 1])!;
      weatherData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search.replace(
          country,
          ""
        )},${country}&appid=${apiKey}`,
        { mode: "cors" }
      );
    } else if (getName(splitSearch[splitSearch.length - 1])) {
      let country = splitSearch[splitSearch.length - 1];
      weatherData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search.replace(
          country,
          ""
        )},${country}&appid=${apiKey}`,
        { mode: "cors" }
      );
    } else {
      weatherData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`,
        { mode: "cors" }
      );
    }
    return weatherData;
  };

  const handleValue = (value: string) => {
    let splitSearchValue = value
      .replaceAll(",", "")
      .replaceAll(", ", " ")
      .replaceAll(" ,", " ")
      .replaceAll("-", "")
      .split(" ");

    return splitSearchValue;
  };

  const handleSubmit = async () => {
    const splitSearchValue = handleValue(searchBarValue);
    const weatherData = await fetchWeather(searchBarValue, splitSearchValue);
    console.log(await weatherData.json());
    setSearchBarValue("");
  };

  const handleKeyDown = async (key: string) => {
    if (key == "Enter" && searchBarValue != "") {
      await handleSubmit();
    }
  };

  return (
    <input
      type={"search"}
      placeholder={"Search"}
      name="searchValue"
      value={searchBarValue}
      onChange={(e) => setSearchBarValue(e.target.value)}
      onKeyDown={async (e) => await handleKeyDown(e.key)}
      onFocus={() => setSearchBarOpacity(1)}
      onBlur={() => setSearchBarOpacity(0.3)}
      css={{
        width: "620px",
        minHeight: "80px",
        opacity: "50%",
        borderRadius: "55px",
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), #585858",
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "30px",
        lineHeight: "45px",
        paddingLeft: "15px",
        color: `rgba(255, 255, 255, ${searchBarOpacity})`,
      }}
      title="Example: Tokyo, JP"
    ></input>
  );
}
