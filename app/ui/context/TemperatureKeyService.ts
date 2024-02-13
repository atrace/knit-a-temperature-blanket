import {
  TemperatureRange,
  defaultTemperatureKey,
} from "@/lib/getColourForTemperature";

const getTemperatureKey = (): TemperatureRange[] | void => {};

export const getTemperatureService = () => ({
  getTemperatureKey,
  updateTemperatureRange: (
    range: TemperatureRange,
    newValues: Partial<TemperatureRange>,
  ) => {
    const temperatureKey = getTemperatureKey();
    if (!temperatureKey) return;

    return temperatureKey.map((current) => {
      if (current.min === range.min) {
        return { ...range, ...newValues };
      }
      return current;
    });
  },
  resetTemperatureKey: () => defaultTemperatureKey,
});
