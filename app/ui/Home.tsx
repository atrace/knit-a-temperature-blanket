"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  TemperatureRange,
  defaultTemperatureKey,
} from "../lib/getColourForTemperature";
import { DailyWeather } from "../lib/openmeteo";
import ColourKey from "./ColourKey";
import Link from "./Link";
import Pattern from "./Pattern";

const getSharableURL = (temperatureKey: TemperatureRange[]) => {
  const queryParam = encodeURIComponent(JSON.stringify(temperatureKey));
  return "?temperatureKey=" + queryParam;
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
    <div className="mx-auto px-5 md:max-w-3xl lg:max-w-screen-xl">
      <div>
        <Link href={getSharableURL(temperatureKey)}>share your blanket</Link>
      </div>
      <div className="flex flex-col justify-center lg:flex-row">
        <div className="lg:order-2 lg:shrink-0">
          <ColourKey
            temperatureRange={temperatureKey}
            updateRange={updateRange}
            resetRanges={resetToDefaultKey}
          />
        </div>
        <Pattern
          temperatureKey={temperatureKey}
          dailyWeather={dailyWeather}
          className="grow lg:order-1"
        />
      </div>
    </div>
  );
};

export default Home;