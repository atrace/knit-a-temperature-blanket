"use client";

import React from "react";
import {
  TemperatureKey,
  TemperatureRange,
} from "../lib/getColourForTemperature";
import ColourKeyRow from "./ColourKeyRow";
import LinkButton from "./LinkButton";

const borderSize = 4;

interface ColourKeyProps extends React.ComponentProps<"div"> {
  temperatureKey: TemperatureKey;
  updateRange: (
    range: TemperatureRange,
    newValues: Partial<TemperatureRange>,
  ) => void;
  resetRanges: () => void;
}

export const getGridTemplate = (rowCount: number) => {
  let gridTemplate = "";
  let rowIndex = 0;

  gridTemplate += `'title title title title resetButton corner'`;

  while (rowIndex < rowCount) {
    gridTemplate +=
      `'minimum-${rowIndex} to-${rowIndex} maximum-${rowIndex} colourName-${rowIndex} editButton-${rowIndex} yarnSwatch-${rowIndex}' ` +
      `'colourPicker-${rowIndex} colourPicker-${rowIndex} colourPicker-${rowIndex} editColourName-${rowIndex} editColourName-${rowIndex} colourPickerEdge-${rowIndex}' `;
    rowIndex++;
  }

  gridTemplate += "'footer footer footer footer footer footer-corner'";
  return gridTemplate;
};

const Footer = () => (
  <>
    <div
      className={`rounded-bl-xl border-key-outline bg-key-background border-${borderSize} border-r-0 border-t-0 p-1`}
      style={{
        gridArea: "footer",
      }}
    />
    <div
      className={`max-w-8 rounded-br-xl border-key-outline bg-key-outline border-${borderSize} border-l-0 border-t-0`}
      style={{
        gridArea: "footer-corner",
      }}
    >
      <div className="bg-key-background py-1" style={{ width: 7.2 }} />
    </div>
  </>
);

const ColourKey = ({
  temperatureKey,
  updateRange,
  resetRanges,
}: ColourKeyProps) => {
  const rows = temperatureKey.map((range, index) => (
    <ColourKeyRow
      key={range.min}
      range={range}
      rowIndex={index}
      updateRange={updateRange}
      borderWidth={borderSize}
    />
  ));

  const gridTemplate = getGridTemplate(rows.length);

  return (
    <div
      key={`grid-container`}
      className="grid max-w-3xl p-3"
      style={{
        gridTemplateAreas: gridTemplate,
      }}
    >
      <h2
        className={`text-key-text rounded-tl-xl border-key-outline bg-key-background border-${borderSize} border-r-0 px-4 py-1`}
        style={{ gridArea: "title", borderBottomStyle: "double" }}
      >
        Temperature colour key
      </h2>
      <LinkButton
        onClick={resetRanges}
        className={`text-key-text bg-key-background text-sm border-${borderSize} border-x-0 border-key-outline`}
        style={{ gridArea: "resetButton", borderBottomStyle: "double" }}
      >
        reset
      </LinkButton>
      <div
        className={`max-w-8 rounded-tr-xl bg-key-background border-${borderSize} border-l-0`}
        style={{ gridArea: "corner", borderBottomStyle: "double" }}
      />
      {rows}
      <Footer />
    </div>
  );
};

export default ColourKey;
