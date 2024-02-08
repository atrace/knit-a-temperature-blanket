"use client";
import { useEffect, useState } from "react";
import {
  TemperatureRange,
  defaultTemperatureKey,
} from "../lib/getColourForTemperature";
import { DailyWeather } from "../lib/openmeteo";
import ColourKey from "./colourKey";
import Pattern from "./pattern";
import Link from "./Link";

export default function Home({
  dailyWeather,
}: {
  dailyWeather: DailyWeather[];
}) {
  const [temperatureKey, setTemperatureKey] = useState<TemperatureRange[]>();

  const getSharableURL = (temperatureKey: TemperatureRange[]) => {
    const queryParam = encodeURIComponent(JSON.stringify(temperatureKey));
    return "?" + queryParam;
  };

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
    if (!temperatureKey) return;

    const newTemperatureKey = temperatureKey.map((current) => {
      if (current.min === range.min) {
        return { ...range, ...newValues };
      }
      return current;
    });
    updateAllRanges(newTemperatureKey);
  };

  useEffect(() => {
    let localTemperatureKey;
    localTemperatureKey = localStorage.getItem("temperatureKey");

    if (
      typeof localTemperatureKey === "string" &&
      localTemperatureKey.length !== 0
    ) {
      const parsedTemperatureKey = JSON.parse(localTemperatureKey);
      if (!!parsedTemperatureKey) {
        updateAllRanges(parsedTemperatureKey);
      }
    }
  }, [setTemperatureKey]);

  if (!temperatureKey) return;

  return (
    <>
      <h1>Knit a temperature blanket</h1>
      <Link href={getSharableURL(temperatureKey)}>share your blanket</Link>
      <br />
      <ColourKey
        temperatureRange={temperatureKey}
        updateRange={updateRange}
        resetRanges={resetToDefaultKey}
      />
      <br />
      <Pattern temperatureRange={temperatureKey} dailyWeather={dailyWeather} />
    </>
  );
}
