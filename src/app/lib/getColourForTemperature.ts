// Ranges are inclusive
export const temperatureRange = [
  { min: -1000, max: -2, colour: "midnightblue" },
  { min: -1, max: 0, colour: "blue" },
  { min: 1, max: 5, colour: "green" },
  { min: 6, max: 10, colour: "greenyellow" },
  { min: 11, max: 15, colour: "lemonchiffon" },
  { min: 16, max: 20, colour: "gold" },
  { min: 21, max: 25, colour: "orange" },
  { min: 26, max: 30, colour: "firebrick" },
  { min: 31, max: 1000, colour: "maroon" }
];

export const getColourForTemperature = (temperature: number) => {
  const integerTemperature = Math.round(temperature);
  let counter = 0;
  while (counter < temperatureRange.length) {
    const range = temperatureRange[counter];
    if (integerTemperature >= range.min && integerTemperature <= range.max) {
      return range.colour;
    }
    counter++;
  }
};
