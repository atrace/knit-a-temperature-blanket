import React from "react";
import { temperatureRange } from "../lib/getColourForTemperature";
import CowHitch from "./CowHitchIcon";

export default function ColourKey() {
  const rows = temperatureRange.map((range) => {
    const min = range.min == -1000 ? "below" : range.min;
    const max = range.max == 1000 ? "above" : range.max;
    return (
      <tr key={min}>
        <td
          style={{
            textAlign: "right",
            backgroundColor: "white",
            color: "black",
          }}
        >
          {min}
        </td>
        <td
          style={{
            backgroundColor: "white",
            color: "black",
          }}
        >
          {" "}
          -{" "}
        </td>
        <td
          style={{
            backgroundColor: "white",
            color: "black",
          }}
        >
          {max}
        </td>
        <td style={{ color: range.colour, backgroundColor: "white" }}>
          {range.colour}
        </td>
        <td style={{ padding: 0 }}>
          <CowHitch
            backgroundColour="white"
            yarnColour={range.colour}
            height={32}
          />
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2>Temperature colour key</h2>
      <table>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}
