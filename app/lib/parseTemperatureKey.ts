import {
  TemperatureKey,
  TemperatureRange,
  defaultTemperatureKey,
} from "./getColourForTemperature";

export const parseTemperatureKey = (unparsed: unknown): TemperatureKey => {
  try {
    if (!unparsed || typeof unparsed !== "string" || unparsed.length == 0) {
      throw new Error("no temperature key provided");
    }
    const jsonified = JSON.parse(unparsed);

    if (!Array.isArray(jsonified)) {
      throw new Error("invalid temperature key provided");
    }

    return jsonified.map((element): TemperatureRange => {
      if (
        typeof element["min"] !== "number" ||
        typeof element["max"] !== "number" ||
        element["colour"].length == 0 ||
        element["colourName"].length == 0
      ) {
        throw new Error(`invalid temperature range ${JSON.stringify(element)}`);
      }

      return {
        min: element.min,
        max: element.max,
        colour: element.colour,
        colourName: element.colourName,
      };
    });
  } catch (error) {
    console.error("reverting to default colour key", error);
    return defaultTemperatureKey;
  }
};
