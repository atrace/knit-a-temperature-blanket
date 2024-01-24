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
    // backgroundColor: "white",
    color: "black",
    backgroundColor: "lightblue",
    // textAlign: "center",
    padding: "20px 0",
    // fontSize: 30,
  };

  const min = range.min == -1000 ? "below" : range.min;
  const max = range.max == 1000 ? "above" : range.max;

  return (
    <>
      <div
        key={`grid-container-${min}`}
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto auto",
          gap: 10,
          backgroundColor: "#2196F3",
          padding: 10,
        }}
      >
        <div
          style={{
            textAlign: "right",
            ...defaultStyle,
          }}
        >
          {min}
        </div>
        <div style={defaultStyle}> - </div>
        <div style={defaultStyle}>{max}</div>
        <div style={{ ...defaultStyle, color: range.colour }}>
          {range.colourName}
        </div>
        <div style={defaultStyle}>
          <button
            style={{ textDecoration: "underline dotted" }}
            onClick={() => setEditingRange(!editingRange)}
          >
            edit
          </button>
        </div>
        <div style={{ padding: 0 }}>
          <CowHitch
            backgroundColour={defaultStyle.backgroundColor}
            yarnColour={range.colour}
            height={32}
          />
        </div>
      </div>
      {editingRange ? (
        <div
          key={`grid-container`}
          style={{
            display: "grid",
            gridTemplateAreas: "'colourPicker editColourName'",
            gap: 15,
            backgroundColor: "#2196F3",
            padding: 10,
          }}
        >
          <HexColorPicker
            color={range.colour}
            onChange={(newColour) => updateRange(range, { colour: newColour })}
            style={{
              gridArea: "colourPicker",
              justifySelf: "self-end",
            }}
          />
          <div style={{ gridArea: "editColourName" }}>
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
                padding: 7,
              }}
              value={range.colourName}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
