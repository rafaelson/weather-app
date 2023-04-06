import WeatherData from "./WeatherData";

export default interface SearchBarProps {
  fetchWeather: (search: string, splitSearch: string[]) => void;
  weatherData: WeatherData;
}
