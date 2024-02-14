import React from "react";
import {
  TemperatureRange,
  getColourForTemperature,
} from "../lib/getColourForTemperature";
import { DailyWeather } from "../lib/openmeteo";

interface PatternProps extends React.ComponentProps<"table"> {
  dailyWeather: DailyWeather[];
  temperatureRange: TemperatureRange[];
}

const Pattern = ({
  dailyWeather,
  temperatureRange,
  ...props
}: PatternProps) => {
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

        <td className="min-w-52" style={{ backgroundColor: colour }}></td>

        <td className="ml-2 flex">
          <p style={{ color: colour }}>{colourName}</p>
        </td>
      </tr>
    );
  });

  return (
    <table {...props}>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Pattern;
