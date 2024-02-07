"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { TemperatureRange } from "../lib/getColourForTemperature";
import CowHitch from "./CowHitchIcon";
import LinkButton from "./LinkButton";

interface ColourKeyRowProps {
  range: TemperatureRange;
  rowIndex: number;
  updateRange: (
    range: TemperatureRange,
    newValues: Partial<TemperatureRange>,
  ) => void;
}

export default function ColourKeyRow({
  range,
  rowIndex,
  updateRange,
}: ColourKeyRowProps) {
  const [editingRange, setEditingRange] = useState(false);

  const defaultStyle = {
    color: "black",
    backgroundColor: "lightblue",
    padding: "5px 0",
  };

  const min = range.min == -1000 ? "below" : range.min;
  const max = range.max == 1000 ? "above" : range.max;

  return (
    <>
      <div
        style={{
          ...defaultStyle,
          textAlign: "right",
          gridArea: `minimum-${rowIndex}`,
        }}
      >
        {min}
      </div>
      <div
        style={{
          ...defaultStyle,
          textAlign: "center",
          gridArea: `to-${rowIndex}`,
        }}
      >
        {" "}
        -{" "}
      </div>
      <div
        style={{
          ...defaultStyle,
          gridArea: `maximum-${rowIndex}`,
        }}
      >
        {max}
      </div>
      <div
        style={{
          ...defaultStyle,
          color: range.colour,
          gridArea: `colourName-${rowIndex}`,
        }}
      >
        {range.colourName}
      </div>
      <LinkButton
        style={{
          ...defaultStyle,
          gridArea: `editButton-${rowIndex}`,
        }}
        onClick={() => setEditingRange(!editingRange)}
      >
        edit
      </LinkButton>
      <div
        style={{
          padding: 0,
          gridArea: `yarnSwatch-${rowIndex}`,
        }}
      >
        <CowHitch
          backgroundColour={defaultStyle.backgroundColor}
          yarnColour={range.colour}
          height={34}
        />
      </div>
      {editingRange ? (
        <>
          <HexColorPicker
            color={range.colour}
            onChange={(newColour) => updateRange(range, { colour: newColour })}
            style={{
              gridArea: `colourPicker-${rowIndex}`,
              justifySelf: "self-end",
              marginRight: 15,
            }}
          />
          <div style={{ gridArea: `editColourName-${rowIndex}` }}>
            <p>choose a new colour name:</p>
            <input
              onChange={({ target }) =>
                updateRange(range, { colourName: target.value })
              }
              style={{
                color: "black",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: range.colour,
                padding: 7,
              }}
              value={range.colourName}
            />
          </div>
        </>
      ) : null}
    </>
  );
}
