import { useState } from "react";
import SearchBarProps from "../interfaces/SearchBarProps";

export default function SearchBar(props: SearchBarProps) {
  const [searchBarOpacity, setSearchBarOpacity] = useState(0.3);
  const [searchBarValue, setSearchBarValue] = useState("");

  const handleValue = (value: string) => {
    let splitSearchValue = value
      .replaceAll(",", "")
      .replaceAll(", ", " ")
      .replaceAll(" ,", " ")
      .replaceAll("-", "")
      .split(" ");

    return splitSearchValue;
  };

  const handleSubmit = () => {
    const splitSearchValue = handleValue(searchBarValue);
    props.fetchWeather(searchBarValue, splitSearchValue);
    setSearchBarValue("");
  };

  const handleKeyDown = (key: string) => {
    if (key == "Enter" && searchBarValue != "") {
      handleSubmit();
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
