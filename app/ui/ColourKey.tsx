"use client";

import React from "react";
import { TemperatureRange } from "../lib/getColourForTemperature";
import ColourKeyRow from "./ColourKeyRow";
import LinkButton from "./LinkButton";

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
      className="rounded-bl-xl bg-secondary-blue p-1"
      style={{
        gridArea: "footer",
      }}
    />
    <div
      className="max-w-8 rounded-br-xl bg-secondary-blue"
      style={{
        gridArea: "footer-corner",
      }}
    />
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
          className="rounded-tl-xl bg-secondary-blue py-1 text-primary-black"
          style={{ gridArea: "title" }}
        >
          Temperature colour key
        </h2>
        <LinkButton
          onClick={resetRanges}
          className="bg-secondary-blue text-primary-black"
          style={{
            gridArea: "resetButton",
          }}
        >
          reset
        </LinkButton>
        <div
          className="max-w-8 rounded-tr-xl bg-secondary-blue"
          style={{
            gridArea: "corner",
          }}
        />
        {rows}
        <Footer />
      </div>
    </div>
  );
};

export default ColourKey;
