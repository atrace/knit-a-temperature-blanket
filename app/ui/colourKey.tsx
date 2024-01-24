"use client";

import { TemperatureRange } from "../lib/getColourForTemperature";
import ColourKeyRow from "./colourKeyRow";

interface ColourKeyProps {
  temperatureRange: TemperatureRange[];
  updateRange: (
    range: TemperatureRange,
    newValues: Partial<TemperatureRange>,
  ) => void;
}

export default function ColourKey({ temperatureRange, updateRange }: ColourKeyProps) {
  const rows = temperatureRange.map((range) => (
    <ColourKeyRow key={range.min} range={range} updateRange={updateRange} />
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
