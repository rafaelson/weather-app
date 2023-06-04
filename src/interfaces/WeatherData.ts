import { CurrentWeatherObject } from "./WeatherObjects";
import { FutureWeatherObject } from "./WeatherObjects";

export default interface WeatherData {
  current?: CurrentWeatherObject;
  future?: FutureWeatherObject;
}
