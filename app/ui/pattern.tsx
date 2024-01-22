import React from "react";
import { getColourForTemperature } from "../lib/getColourForTemperature";
import { DailyWeather } from "../lib/openmeteo";

export default function Pattern({
  dailyWeather
}: {
  dailyWeather: DailyWeather[];
}) {
  //TODO:  Make text item generator generic to allow extra fields to be added easily
  const rows = dailyWeather.map((todaysWeather) => {
    const date = todaysWeather.datetime.toDateString().slice(4, 10);

    const colour = getColourForTemperature(todaysWeather.temperature2mMean);

    // Most recent 2 days come back as NaN :thonk:
    if (!todaysWeather.temperature2mMean) return;

    return (
      <tr key={date}>
        <td>{date}</td>
        <td>({todaysWeather.temperature2mMean.toFixed()}°C)</td>

        <td style={{ backgroundColor: colour, width: 200 }}></td>

        <td style={{ marginLeft: 4, display: "flex" }}>
          <p>knit 1 row of</p>
          <p style={{ marginLeft: 4, color: colour }}>{colour}</p>
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
