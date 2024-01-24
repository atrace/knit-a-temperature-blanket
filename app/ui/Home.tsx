"use client";
import { useState } from "react";
import {
  TemperatureRange,
  defaultTemperatureRange,
} from "../lib/getColourForTemperature";
import { DailyWeather } from "../lib/openmeteo";
import ColourKey from "./colourKey";
import Pattern from "./pattern";

export default function Home({
  dailyWeather,
}: {
  dailyWeather: DailyWeather[];
}) {
  const [temperatureRange, setTemperatureRange] = useState(
    defaultTemperatureRange,
  );

  const updateRange = (
    range: TemperatureRange,
    newValues: Partial<TemperatureRange>,
  ) => {
    const newTempRange = temperatureRange.map((current) => {
      if (current.min === range.min) {
        return { ...range, ...newValues };
      }
      return current;
    });
    setTemperatureRange(newTempRange);
  };

  return (
    <main>
      <h1>Knit a temperature blanket</h1>
      <br />
      <ColourKey
        temperatureRange={temperatureRange}
        updateRange={updateRange}
      />
      <br />
      <Pattern
        temperatureRange={temperatureRange}
        dailyWeather={dailyWeather}
      />
    </main>
  );
}
