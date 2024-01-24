"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { TemperatureRange } from "../lib/getColourForTemperature";
import CowHitch from "./CowHitchIcon";

interface ColourKeyRowProps {
  range: TemperatureRange;
  setColourForRange: (range: TemperatureRange, colour: string) => void;
}

export default function ColourKeyRow({
  range,
  setColourForRange,
}: ColourKeyRowProps) {
  const [hideColourPicker, setHideColourPicker] = useState(true);

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
          <button onClick={() => setHideColourPicker(!hideColourPicker)}>
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
      {hideColourPicker ? null : (
        <tr>
          <HexColorPicker
            color={range.colour}
            onChange={(newColour) => setColourForRange(range, newColour)}
          />
          {/* <input onChange={() =>{}}></input> */}
        </tr>
      )}
    </>
  );
}
