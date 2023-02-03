import { FormEvent, useState } from "react";
import { getCode, getName } from "country-list";

export default function SearchBar() {
  const [searchBarOpacity, setSearchBarOpacity] = useState(0.3);

  const fetchWeather = async (search: string, splitSearch: string[]) => {
    const apiKey = "2d6d5dcae015b67de90985989421c864";
    let weatherData;

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

  const handleForm = (form: HTMLFormElement): [string, string[]] => {
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const searchValue = formJson.searchValue as string;
    let splitSearchValue = searchValue
      .replaceAll(",", "")
      .replaceAll(", ", " ")
      .replaceAll(" ,", " ")
      .replaceAll("-", "")
      .split(" ");

    return [searchValue, splitSearchValue];
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const [searchValue, splitSearchValue] = handleForm(
      e.target as HTMLFormElement
    );
    const weatherData = await fetchWeather(searchValue, splitSearchValue);

    console.log(await weatherData.json());
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <input
        type={"search"}
        placeholder={"Search"}
        name="searchValue"
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
    </form>
  );
}
