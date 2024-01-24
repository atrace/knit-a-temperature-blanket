"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { TemperatureRange } from "../lib/getColourForTemperature";
import CowHitch from "./CowHitchIcon";

interface ColourKeyRowProps {
  range: TemperatureRange;
  updateRange: (
    range: TemperatureRange,
    newValues: Partial<TemperatureRange>,
  ) => void;
}

export default function ColourKeyRow({ range, updateRange }: ColourKeyRowProps) {
  const [editingRange, setEditingRange] = useState(false);

  const defaultStyle = {
    backgroundColor: "white",
    color: "black",
  };

  const min = range.min == -1000 ? "below" : range.min;
  const max = range.max == 1000 ? "above" : range.max;

  return (
    <>
      <tr key={min}>
        <td
          style={{
            textAlign: "right",
            ...defaultStyle,
          }}
        >
          {min}
        </td>
        <td style={defaultStyle}> - </td>
        <td
          style={{
            backgroundColor: "white",
            color: "black",
          }}
        >
          {max}
        </td>
        <td style={{ ...defaultStyle, color: range.colour }}>
          {range.colourName}
        </td>
        <td style={defaultStyle}>
          <button
            style={{ textDecoration: "underline dotted" }}
            onClick={() => setEditingRange(!editingRange)}
          >
            edit
          </button>
        </td>
        <td style={{ padding: 0 }}>
          <CowHitch
            backgroundColour={defaultStyle.backgroundColor}
            yarnColour={range.colour}
            height={32}
          />
        </td>
      </tr>
      {editingRange ? (
        <div style={{ display: "flex" }}>
          <HexColorPicker
            color={range.colour}
            onChange={(newColour) => updateRange(range, { colour: newColour })}
          />
          <div>
            <p>choose a new colour name:</p>
            <input
              onChange={({ target }) =>
                updateRange(range, { colourName: target.value })
              }
              style={{
                ...defaultStyle,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: range.colour,
              }}
              value={range.colourName}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
