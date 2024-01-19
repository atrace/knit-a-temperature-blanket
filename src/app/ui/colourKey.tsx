import { temperatureRange } from "../lib/getColourForTemperature";

export default function ColourKey() {
  const rows = temperatureRange.map((range) => {
    const min = range.min == -1000 ? "below" : range.min;
    const max = range.max == 1000 ? "above" : range.max;
    return (
      <tr key={min}>
        <td style={{ textAlign: "right" }}>{min}</td>
        <td> - </td>
        <td>{max}</td>
        <td style={{ color: range.colour }}>{range.colour}</td>
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
