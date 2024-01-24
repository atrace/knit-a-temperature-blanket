import {
  defaultTemperatureRange,
  getColourForTemperature,
} from "./getColourForTemperature";

describe("getColourForTemperature", () => {
  it("should get correct colour for a given temperature", () => {
    expect(
      getColourForTemperature(defaultTemperatureRange, parseFloat("23.56666")),
    ).toEqual({ colour: "#FFA500", colourName: "orange" });
  });

  it("should get a colour for a borderline temperature at the edge of a range", () => {
    expect(getColourForTemperature(defaultTemperatureRange, 11)).toEqual({
      colour: "#fffacd",
      colourName: "lemonchiffon",
    });
  });

  it("should get a colour for a non-integer temperature between ranges", () => {
    expect(
      getColourForTemperature(defaultTemperatureRange, parseFloat("-1.8")),
    ).toEqual({ colour: "#191970", colourName: "midnightblue" });
  });
});
