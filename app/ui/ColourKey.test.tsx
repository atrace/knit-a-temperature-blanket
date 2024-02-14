import { getGridTemplate } from "./ColourKey";

describe("colourKey", () => {
  it("returns a grid template for 3 rows", () => {
    const result = getGridTemplate(3);

    expect(result).toEqual(
      "'minimum-0 to-0 maximum-0 colourName-0 editButton-0 yarnSwatch-0' " +
        "'colourPicker-0 editColourName-0' " +
        "'minimum-1 to-1 maximum-1 colourName-1 editButton-1 yarnSwatch-1' " +
        "'colourPicker-1 editColourName-1' " +
        "'minimum-2 to-2 maximum-2 colourName-2 editButton-2 yarnSwatch-2' " +
        "'colourPicker-2 editColourName-2' ",
    );
  });
});
