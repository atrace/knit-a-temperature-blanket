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

    return (
      <div key={date}>
        <text>{date}</text>
        {"  "}
        <text>
          ({todaysWeather.temperature2mMean.toFixed()}°C) knit 1 row of
        </text>
        {"  "}
        <text style={{ color: colour }}>{colour}</text>
        <br />
      </div>
    );
  });

  return (
    <>
      <text>Date</text> <text>Temperature</text>
      {rows}
    </>
  );
}
