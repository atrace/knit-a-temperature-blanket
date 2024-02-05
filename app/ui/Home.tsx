"use client";
import { useState } from "react";
import {
  TemperatureRange,
  defaultTemperatureKey,
} from "../lib/getColourForTemperature";
import { DailyWeather } from "../lib/openmeteo";
import ColourKey from "./colourKey";
import Pattern from "./pattern";

export default function Home({
  dailyWeather,
}: {
  dailyWeather: DailyWeather[];
}) {
  const localTemperatureKey = localStorage.getItem("temperatureKey");

  let parsedTemperatureKey;
  if (
    typeof localTemperatureKey === "string" &&
    localTemperatureKey.length !== 0
  ) {
    parsedTemperatureKey = JSON.parse(localTemperatureKey);
  }

  const [temperatureKey, setTemperatureKey] = useState<TemperatureRange[]>(
    parsedTemperatureKey || defaultTemperatureKey,
  );

  const updateAllRanges = (newTemperatureKey: TemperatureRange[]) => {
    setTemperatureKey(newTemperatureKey);
    localStorage.setItem("temperatureKey", JSON.stringify(newTemperatureKey));
  };

  const resetToDefaultKey = () => {
    updateAllRanges(defaultTemperatureKey);
  };

  const updateRange = (
    range: TemperatureRange,
    newValues: Partial<TemperatureRange>,
  ) => {
    const newTemperatureKey = temperatureKey?.map((current) => {
      if (current.min === range.min) {
        return { ...range, ...newValues };
      }
      return current;
    });
    updateAllRanges(newTemperatureKey);
  };

  return (
    <main>
      <h1>Knit a temperature blanket</h1>
      <br />
      <ColourKey
        temperatureRange={temperatureKey}
        updateRange={updateRange}
        resetRanges={resetToDefaultKey}
      />
      <br />
      <Pattern temperatureRange={temperatureKey} dailyWeather={dailyWeather} />
    </main>
  );
}
