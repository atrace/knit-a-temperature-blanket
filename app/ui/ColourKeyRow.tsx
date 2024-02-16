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
  borderWidth: number;
}

const ColourKeyRow = ({
  range,
  rowIndex,
  updateRange,
  borderWidth,
}: ColourKeyRowProps) => {
  const [editingRange, setEditingRange] = useState(false);

  const backgroundColour = "white";
  const baseClasses = "bg-key-background text-key-text p-1";

  const min = range.min == -1000 ? "below" : range.min;
  const max = range.max == 1000 ? "above" : range.max;

  return (
    <>
      <p
        className={`${baseClasses} border-key-outline border-l-${borderWidth} text-right`}
        style={{
          gridArea: `minimum-${rowIndex}`,
        }}
      >
        {min}
      </p>
      <p
        className={`${baseClasses} text-center`}
        style={{
          gridArea: `to-${rowIndex}`,
        }}
      >
        {" "}
        –{" "}
      </p>
      <p
        className={baseClasses}
        style={{
          gridArea: `maximum-${rowIndex}`,
        }}
      >
        {max}
      </p>
      <p
        className={baseClasses}
        style={{
          color: range.colour,
          gridArea: `colourName-${rowIndex}`,
        }}
      >
        {range.colourName}
      </p>
      <LinkButton
        className={`${baseClasses} px-2 text-sm`}
        style={{
          gridArea: `editButton-${rowIndex}`,
        }}
        onClick={() => setEditingRange(!editingRange)}
      >
        {editingRange ? "done" : "edit"}
      </LinkButton>
      <div
        className="p-0"
        style={{
          gridArea: `yarnSwatch-${rowIndex}`,
        }}
      >
        <CowHitch
          backgroundColour={backgroundColour}
          yarnColour={range.colour}
          height={34.5}
        />
      </div>
      {editingRange ? (
        <>
          <div
            style={{
              borderLeftWidth: borderWidth,
              gridArea: `colourPicker-${rowIndex}`,
            }}
            className="flex justify-end px-4"
          >
            <HexColorPicker
              color={range.colour}
              onChange={(newColour) =>
                updateRange(range, { colour: newColour })
              }
            />
          </div>
          <div style={{ gridArea: `editColourName-${rowIndex}` }}>
            <p>choose a new colour name:</p>
            <input
              onChange={({ target }) =>
                updateRange(range, { colourName: target.value })
              }
              className={`border border-solid p-2 text-primary-black`}
              style={{
                borderColor: range.colour,
              }}
              value={range.colourName}
            />
          </div>
          <div
            style={{
              paddingLeft: 7.2,
              gridArea: `colourPickerEdge-${rowIndex}`,
            }}
          >
            <div className="bg-key-outline min-h-full" style={{ width: 25 }} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default ColourKeyRow;