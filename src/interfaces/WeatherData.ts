import { CurrentWeatherObject } from "./CurrentWeatherObject";

export default interface WeatherData {
  current?: CurrentWeatherObject;
  future?: any;
}
