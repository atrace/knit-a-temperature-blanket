import { getWeather } from "./lib/openmeteo";
import { wmoCode } from "./lib/wmoCodes";

// Ranges are inclusive
const temperatureRange = [
  { min: -1000, max: -2, colour: "bluevoilet" },
  { min: -1, max: 0, colour: "blue" },
  { min: 1, max: 5, colour: "greenyellow" },
  { min: 6, max: 10, colour: "green" },
  { min: 11, max: 15, colour: "yellow" },
  { min: 16, max: 20, colour: "amber" },
  { min: 21, max: 25, colour: "orange" },
  { min: 26, max: 30, colour: "red" },
  { min: 31, max: 1000, colour: "purple" }
];

const getColourForTemperature = (temperature: number) => {
  const integerTemperature = Math.round(temperature)
  console.log("integerTemperature:", Math.round(temperature) )
  let counter = 0;
  while ( counter < temperatureRange.length) {
    const range = temperatureRange[counter];
    console.log("range:", range)
    if (integerTemperature >= range.min && integerTemperature <= range.max) {
      console.log("range.colour & temperature", range.colour, integerTemperature);
      return range.colour;
    }
    counter++;
  }
  console.log("temperature:", integerTemperature)
  
}


const printWeatherRows = async () => {
  const dailyWeather = await getWeather();

  //TODO:  Make text item generator generic to allow extra fields to be added easily
  return dailyWeather.map((todaysWeather) => {
    const date = todaysWeather.datetime.toDateString();

    const colour = getColourForTemperature(todaysWeather.temperature2mMean);

    return (
      <div key={date}>
        <text>{date}</text>
        {"  "}
        <text>{todaysWeather.temperature2mMean.toFixed()}°C </text>
        {"  "}
        <text style={{ color: colour }}>{colour}</text>
        {"  "}
        <text>{wmoCode[todaysWeather.weatherCode]}</text>
        {"  "}
        <text>
          {(todaysWeather.daylightDuration / 60 / 60).toFixed()}h
          {((todaysWeather.daylightDuration / 60) % 60).toFixed()}m
        </text>
        {"  "}
        <text>{todaysWeather.precipitationSum.toFixed()}mm</text>
        <br />
      </div>
    );
  });
};

export default function Home() {
  return (
    <main>
      <text>Hello world</text>
      <br />
      <br />
      <text>Date</text> <text>Temperature</text> <text>Prevailing weather</text>{" "}
      <text>Daylight duration</text> <text>Precipitation</text>
      {printWeatherRows()}
    </main>
  );
}
