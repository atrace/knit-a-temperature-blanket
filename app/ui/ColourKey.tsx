"use client";

import React from "react";
import { TemperatureRange } from "../lib/getColourForTemperature";
import ColourKeyRow from "./ColourKeyRow";
import LinkButton from "./LinkButton";

const borderSize = 4;

interface ColourKeyProps extends React.ComponentProps<"div"> {
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

  gridTemplate += `'title title title title resetButton corner'`;

  while (rowIndex < rowCount) {
    gridTemplate +=
      `'minimum-${rowIndex} to-${rowIndex} maximum-${rowIndex} colourName-${rowIndex} editButton-${rowIndex} yarnSwatch-${rowIndex}' ` +
      `'colourPicker-${rowIndex} colourPicker-${rowIndex} colourPicker-${rowIndex} editColourName-${rowIndex} editColourName-${rowIndex} editColourName-${rowIndex}' `;
    rowIndex++;
  }

  gridTemplate += "'footer footer footer footer footer footer-corner'";
  return gridTemplate;
};

const Footer = () => (
  <>
    <div
      className={`bg-key-background border-key-outline rounded-bl-xl border-${borderSize} border-r-0 border-t-0 p-1`}
      style={{
        gridArea: "footer",
      }}
    />
    <div
      className={`bg-key-outline border-key-outline max-w-8 rounded-br-xl border-${borderSize} border-l-0 border-t-0`}
      style={{
        gridArea: "footer-corner",
      }}
    >
      <div className="bg-key-background py-1" style={{ width: 7.2 }} />
    </div>
  </>
);

const ColourKey = ({
  temperatureRange,
  updateRange,
  resetRanges,
  ...props
}: ColourKeyProps) => {
  const rows = temperatureRange.map((range, index) => (
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
    <div {...props}>
      <div
        key={`grid-container`}
        className="grid max-w-3xl p-3"
        style={{
          gridTemplateAreas: gridTemplate,
        }}
      >
        <h2
          className={`bg-key-background text-key-text border-key-outline rounded-tl-xl border-${borderSize} border-r-0 px-4 py-1`}
          style={{ gridArea: "title", borderBottomStyle: "double" }}
        >
          Temperature colour key
        </h2>
        <LinkButton
          onClick={resetRanges}
          className={`bg-key-background text-key-text text-sm border-${borderSize} border-key-outline border-x-0`}
          style={{ gridArea: "resetButton", borderBottomStyle: "double" }}
        >
          reset
        </LinkButton>
        <div
          className={`bg-key-background max-w-8 rounded-tr-xl border-${borderSize} border-l-0`}
          style={{ gridArea: "corner", borderBottomStyle: "double" }}
        />
        {rows}
        <Footer />
      </div>
    </div>
  );
};

export default ColourKey;
