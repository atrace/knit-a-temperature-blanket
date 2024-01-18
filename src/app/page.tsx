import { getWeather } from "./lib/openmeteo";

const printWeatherRows = async () => {
  const dailyWeather = await getWeather();

  return dailyWeather.map((todaysWeather) => (
    <div key={todaysWeather.datetime}>
      <text>
        {todaysWeather.datetime} {todaysWeather.weatherCode}
        {todaysWeather.temperature2mMean} {todaysWeather.daylightDuration}
        {todaysWeather.precipitationSum}
      </text>
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
