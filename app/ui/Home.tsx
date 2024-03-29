"use client";
import { parseTemperatureKey } from "@/lib/parseTemperatureKey";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  TemperatureKey,
  TemperatureRange,
  defaultTemperatureKey,
} from "../lib/getColourForTemperature";
import { DailyWeather } from "../lib/openmeteo";
import ColourKey from "./ColourKey";
import Link from "./Link";
import Pattern from "./Pattern";

const getSharableQueryParam = (temperatureKey: TemperatureKey) => {
  const queryParam = encodeURIComponent(JSON.stringify(temperatureKey));
  return "?temperatureKey=" + queryParam;
};

interface HomeProps {
  dailyWeather: DailyWeather[];
}

const Home = ({ dailyWeather }: HomeProps) => {
  const [temperatureKey, setTemperatureKey] = useState<TemperatureKey>();

  const updateAllRanges = (newTemperatureKey: TemperatureKey) => {
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
      updateAllRanges(parseTemperatureKey(sharedTemperatureKey));
    } else {
      updateAllRanges(
        parseTemperatureKey(localStorage.getItem("temperatureKey")),
      );
    }
  }, [setTemperatureKey, sharedTemperatureKey]);

  if (!temperatureKey) return;

  return (
    <div className="mx-auto px-5 md:max-w-3xl lg:max-w-screen-xl">
      <Link href={getSharableQueryParam(temperatureKey)}>share blanket</Link>

      <Link className="mx-3" href={"/print-a-pattern"}>
        print pattern
      </Link>

      <div className="flex flex-col justify-center lg:flex-row">
        <div className="lg:order-2 lg:shrink-0">
          <ColourKey
            temperatureKey={temperatureKey}
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