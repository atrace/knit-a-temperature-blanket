"use client";
import { useEffect, useState } from "react";
import {
  TemperatureRange,
  defaultTemperatureKey,
} from "../lib/getColourForTemperature";
import { DailyWeather } from "../lib/openmeteo";
import ColourKey from "./ColourKey";
import Pattern from "./Pattern";
import Link from "./Link";
import { useSearchParams } from "next/navigation";
import { knitFont } from "@/font";

const getSharableURL = (temperatureKey: TemperatureRange[]) => {
  const queryParam = encodeURIComponent(JSON.stringify(temperatureKey));
  return "?temperatureKey=" + queryParam;
};

// TODO: Figure out responsiveness here! Using character key in preview at
// https://www.fontspace.com/jolly-sweater-font-f106312#action=charmap&id=jEpM9
const makeKnittedFont = (message: string): string => {
  return `#####(${message.replaceAll(" ", "_")})#####`;
};

interface HomeProps {
  dailyWeather: DailyWeather[];
}

const Home = ({ dailyWeather }: HomeProps) => {
  const [temperatureKey, setTemperatureKey] = useState<TemperatureRange[]>();

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

  const sharedTemperatureKey = useSearchParams().get("temperatureKey");

  useEffect(() => {
    if (!!sharedTemperatureKey) {
      setTemperatureKey(JSON.parse(sharedTemperatureKey));
    } else {
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
    }
  }, [setTemperatureKey, sharedTemperatureKey]);

  if (!temperatureKey) return;

  return (
    <div className="mx-auto max-w-screen-xl">
      <div>
        <h1 className={knitFont.className}>
          {makeKnittedFont("Knit a temperature blanket")}
        </h1>
        <Link href={getSharableURL(temperatureKey)}>share your blanket</Link>
      </div>
      <div className="justify-center md:flex">
        <ColourKey
          temperatureRange={temperatureKey}
          updateRange={updateRange}
          resetRanges={resetToDefaultKey}
          className="md:order-2 md:shrink-0"
        />
        <Pattern
          temperatureRange={temperatureKey}
          dailyWeather={dailyWeather}
          className="md:order-1"
        />
      </div>
    </div>
  );
};

export default Home;