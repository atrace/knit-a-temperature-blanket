import React from "react";
import {
  TemperatureRange,
  getColourForTemperature,
} from "../lib/getColourForTemperature";
import { DailyWeather } from "../lib/openmeteo";

export default function Pattern({
  dailyWeather,
  temperatureRange,
}: {
  dailyWeather: DailyWeather[];
  temperatureRange: TemperatureRange[];
}) {
  //TODO:  Make text item generator generic to allow extra fields to be added easily
  const rows = dailyWeather.map((todaysWeather) => {
    // Most recent 2 days come back as NaN :thonk:
    if (!todaysWeather.temperature2mMean) return;

    const date = todaysWeather.datetime.toDateString().slice(4, 10);

    const { colour, colourName } = getColourForTemperature(
      temperatureRange,
      todaysWeather.temperature2mMean,
    );

    return (
      <tr key={date}>
        <td>{date}</td>
        <td>({todaysWeather.temperature2mMean.toFixed()}°C)</td>

        <td style={{ backgroundColor: colour, width: 200 }}></td>

        <td style={{ marginLeft: 4, display: "flex" }}>
          <p>knit 1 row of</p>
          <p style={{ marginLeft: 4, color: colour }}>{colourName}</p>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2>Date Temperature</h2>
      <table>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}
