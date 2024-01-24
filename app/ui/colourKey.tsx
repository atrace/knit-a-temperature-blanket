"use client";

import { TemperatureRange } from "../lib/getColourForTemperature";
import ColourKeyRow from "./colourKeyRow";

interface ColourKeyProps {
  temperatureRange: TemperatureRange[];
  setColourForRange: (range: TemperatureRange, colour: string) => void;
}

export default function ColourKey({
  temperatureRange,
  setColourForRange,
}: ColourKeyProps) {
  const rows = temperatureRange.map((range) => (
    <ColourKeyRow
      key={range.min}
      range={range}
      setColourForRange={setColourForRange}
    />
  ));

  return (
    <>
      <h2>Temperature colour key</h2>
      <table>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}
