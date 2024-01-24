// Ranges are inclusive
export interface TemperatureRange {
  min: number;
  max: number;
  colour: string;
  colourName: string;
}

export const defaultTemperatureRange = [
  { min: -1000, max: -2, colour: "#191970", colourName: "midnightblue" },
  { min: -1, max: 0, colour: "#0000FF", colourName: "blue" },
  { min: 1, max: 5, colour: "#008000", colourName: "green" },
  { min: 6, max: 10, colour: "#adff2f", colourName: "greenyellow" },
  { min: 11, max: 15, colour: "#fffacd", colourName: "lemonchiffon" },
  { min: 16, max: 20, colour: "#FFD700", colourName: "gold" },
  { min: 21, max: 25, colour: "#FFA500", colourName: "orange" },
  { min: 26, max: 30, colour: "#b22222", colourName: "firebrick" },
  { min: 31, max: 1000, colour: "#800000", colourName: "maroon" },
];

export const getColourForTemperature = (
  temperatureRange: TemperatureRange[],
  temperature: number,
) => {
  const integerTemperature = Math.round(temperature);
  let counter = 0;
  while (counter < temperatureRange.length) {
    const range = temperatureRange[counter];
    if (integerTemperature >= range.min && integerTemperature <= range.max) {
      return { colour: range.colour, colourName: range.colourName };
    }
    counter++;
  }
  throw new Error(
    `could not find temperature range for minimum temperature ${temperature}`,
  );
};
