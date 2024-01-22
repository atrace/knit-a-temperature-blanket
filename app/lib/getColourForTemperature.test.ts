import { getColourForTemperature } from "./getColourForTemperature";

describe("getColourForTemperature", () => {
  it("should get correct colour for a given temperature", () => {
    expect(getColourForTemperature(parseFloat("23.56666"))).toEqual("orange");
  });

  it("should get a colour for a borderline temperature at the edge of a range", () => {
    expect(getColourForTemperature(11)).toEqual("lemonchiffon");
  });

  it("should get a colour for a non-integer temperature between ranges", () => {
    expect(getColourForTemperature(parseFloat("-1.8"))).toEqual("midnightblue");
  });
});
