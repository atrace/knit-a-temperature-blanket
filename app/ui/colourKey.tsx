"use client";

import { TemperatureRange } from "../lib/getColourForTemperature";
import ColourKeyRow from "./colourKeyRow";

interface ColourKeyProps {
  temperatureRange: TemperatureRange[];
  updateRange: (
    range: TemperatureRange,
    newValues: Partial<TemperatureRange>,
  ) => void;
  resetRanges: () => void;
}

export const getGridTemplate = (rowCount: number) => {
  let gridTemplate = "";
  let rowIndex = 0;

  gridTemplate += `'title title title title resetButton empty'`;

  while (rowIndex < rowCount) {
    gridTemplate +=
      `'minimum-${rowIndex} to-${rowIndex} maximum-${rowIndex} colourName-${rowIndex} editButton-${rowIndex} yarnSwatch-${rowIndex}' ` +
      `'colourPicker-${rowIndex} colourPicker-${rowIndex} colourPicker-${rowIndex} editColourName-${rowIndex} editColourName-${rowIndex} editColourName-${rowIndex}' `;
    rowIndex++;
  }
  return gridTemplate;
};

export default function ColourKey({
  temperatureRange,
  updateRange,
  resetRanges,
}: ColourKeyProps) {
  const rows = temperatureRange.map((range, index) => (
    <ColourKeyRow
      key={range.min}
      range={range}
      rowIndex={index}
      updateRange={updateRange}
    />
  ));

  const gridTemplate = getGridTemplate(rows.length);

  return (
    <>
      <div
        key={`grid-container`}
        style={{
          display: "grid",
          gridTemplateAreas: gridTemplate,
          padding: 10,
          maxWidth: 700,
        }}
      >
        <h2 style={{ gridArea: "title" }}>Temperature colour key</h2>
        <button
          onClick={resetRanges}
          style={{
            color: "white",
            textDecoration: "underline dotted",
            gridArea: "resetButton",
          }}
        >
          reset
        </button>
        {rows}
      </div>
    </>
  );
}
