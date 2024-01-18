import { getWeather } from "./lib/openmeteo";
import { wmoCode } from "./lib/wmoCodes";

const printWeatherRows = async () => {
  const dailyWeather = await getWeather();

  //TODO:  Make text item generator generic to allow extra fields to be added easily
  return dailyWeather.map((todaysWeather) => (
    <div key={todaysWeather.datetime}>
      <text>{todaysWeather.datetime}</text>
      {"  "}
      <text>{wmoCode[todaysWeather.weatherCode]}</text>
      {"  "}
      <text>{todaysWeather.temperature2mMean.toFixed()}°C </text>
      {"  "}
      <text>
        {(todaysWeather.daylightDuration / 60 / 60).toFixed()}h
        {((todaysWeather.daylightDuration / 60) % 60).toFixed()}m
      </text>
      {"  "}
      <text>{todaysWeather.precipitationSum.toFixed()}mm</text>
      <br />
    </div>
  ));
};

export default function Home() {
  return (
    <main>
      <text>Hello world</text>
      <br />
      <br />
      {printWeatherRows()}
    </main>
  );
}
