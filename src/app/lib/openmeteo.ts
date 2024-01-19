import { fetchWeatherApi } from "openmeteo";

export interface DailyWeather {
  datetime: Date;
  weatherCode: number;
  temperature2mMean: number;
  daylightDuration: number;
  precipitationSum: number;
}

export const getWeather = async (): Promise<DailyWeather[]> => {
  const params = {
    latitude: 53.9566,
    longitude: -1.0774,
    start_date: "2024-01-01",
    end_date: "2024-01-18",
    daily: [
      "weather_code",
      "temperature_2m_mean",
      "daylight_duration",
      "precipitation_sum"
    ],
    timezone: "Europe/London"
  };
  const url = "https://archive-api.open-meteo.com/v1/archive";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      weatherCode: daily.variables(0)!.valuesArray()!,
      temperature2mMean: daily.variables(1)!.valuesArray()!,
      daylightDuration: daily.variables(2)!.valuesArray()!,
      precipitationSum: daily.variables(3)!.valuesArray()!
    }
  };

  const dailyWeather: DailyWeather[] = [];

  for (let i = 0; i < weatherData.daily.time.length; i++) {
    dailyWeather.push({
      datetime: weatherData.daily.time[i],
      weatherCode: weatherData.daily.weatherCode[i], // WMO code
      temperature2mMean: weatherData.daily.temperature2mMean[i], // degrees celcius
      daylightDuration: weatherData.daily.daylightDuration[i], // seconds
      precipitationSum: weatherData.daily.precipitationSum[i] // millimetres
    });
  }

  return dailyWeather;
};
