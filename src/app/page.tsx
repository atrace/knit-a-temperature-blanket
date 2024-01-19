import { getWeather } from "./lib/openmeteo";

// Ranges are inclusive
const temperatureRange = [
  { min: -1000, max: -2, colour: "midnightblue" },
  { min: -1, max: 0, colour: "blue" },
  { min: 1, max: 5, colour: "green" },
  { min: 6, max: 10, colour: "greenyellow" },
  { min: 11, max: 15, colour: "lemonchiffon" },
  { min: 16, max: 20, colour: "gold" },
  { min: 21, max: 25, colour: "orange" },
  { min: 26, max: 30, colour: "firebrick" },
  { min: 31, max: 1000, colour: "maroon" }
];

const getColourForTemperature = (temperature: number) => {
  const integerTemperature = Math.round(temperature);
  let counter = 0;
  while (counter < temperatureRange.length) {
    const range = temperatureRange[counter];
    if (integerTemperature >= range.min && integerTemperature <= range.max) {
      return range.colour;
    }
    counter++;
  }
};

const printColourKey = () => {
  const rows = temperatureRange.map((range) => {
    const min = range.min == -1000 ? "below" : range.min;
    const max = range.max == 1000 ? "above" : range.max;
    return (
      <tr key={min}>
        <td style={{ textAlign: "right" }}>{min}</td>
        <td> - </td>
        <td>{max}</td>
        <td style={{ color: range.colour }}>{range.colour}</td>
      </tr>
    );
  });

  return (
    <>
      <h2>Temperature colour key</h2>
      <table>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
};

const printWeatherRows = async () => {
  const dailyWeather = await getWeather();

  //TODO:  Make text item generator generic to allow extra fields to be added easily
  return dailyWeather.map((todaysWeather) => {
    const date = todaysWeather.datetime.toDateString().slice(4, 10);

    const colour = getColourForTemperature(todaysWeather.temperature2mMean);

    return (
      <div key={date}>
        <text>{date}</text>
        {"  "}
        <text>{todaysWeather.temperature2mMean.toFixed()}°C knit 1 row of</text>
        {"  "}
        <text style={{ color: colour }}>{colour}</text>
        <br />
      </div>
    );
  });
};

export default function Home() {
  return (
    <main>
      <h1>Knit a temperature blanket</h1>
      <br />
      {printColourKey()}
      <br />
      <text>Date</text> <text>Temperature</text>
      {printWeatherRows()}
    </main>
  );
}
