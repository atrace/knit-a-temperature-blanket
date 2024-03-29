"use client";
import {
  defaultTemperatureKey,
  getColourForTemperature,
} from "@/lib/getColourForTemperature";
import { DailyWeather } from "@/lib/openmeteo";
import { parseTemperatureKey } from "@/lib/parseTemperatureKey";
import { useSearchParams } from "next/navigation";

interface PrintablePatternProps {
  dailyWeather: DailyWeather[];
}

const PrintablePattern = ({ dailyWeather }: PrintablePatternProps) => {
  let temperatureKey = defaultTemperatureKey;
  const sharedTemperatureKey = useSearchParams().get("temperatureKey");
  if (!!sharedTemperatureKey) {
    temperatureKey = parseTemperatureKey(sharedTemperatureKey);
  } else {
    temperatureKey = parseTemperatureKey(
      localStorage.getItem("temperatureKey"),
    );
  }

  let currentColour = "";
  let currentColourCount = 0;
  let currentColourStartDate = "";
  const rows = dailyWeather.map((todaysWeather) => {
    // Most recent 2 days come back as NaN :thonk:
    if (!todaysWeather.temperature2mMean) return;

    const date = todaysWeather.datetime.toDateString().slice(4, 10);

    const { colour, colourName } = getColourForTemperature(
      temperatureKey,
      todaysWeather.temperature2mMean,
    );

    // day 1
    if (currentColour.length == 0) {
      currentColour = colourName;
      currentColourCount = 1;
      currentColourStartDate = date;
    }

    if (colourName !== currentColour) {
      // changing colour
      const row = (
        <tr className="flex" key={date}>
          <td className="min-w-14">{currentColourStartDate}</td>
          <td className="mx-6 min-w-6" style={{ backgroundColor: colour }} />
          <td>
            Knit {currentColourCount} row(s) of {currentColour}
          </td>
        </tr>
      );

      // set up for next loop
      currentColour = colourName;
      currentColourCount = 1;
      currentColourStartDate = date;
      // return an element
      return row;
    }

    // same colour so just increase counter & return nothing
    currentColourCount++;
    currentColour = colourName;
    return;

    //remember not to lose the last one!
  });

  return (
    <table>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default PrintablePattern;
