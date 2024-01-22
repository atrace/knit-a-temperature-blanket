import { getWeather } from "./openmeteo";

// import * as openmeteo from "openmeteo";
// const fetchWeatherApiSpy = jest.spyOn(openmeteo, "fetchWeatherApi");

import { fetchWeatherApi } from "openmeteo";
jest.mock("openmeteo");
const mockFetchWeatherApi = fetchWeatherApi as jest.MockedFunction<
  typeof fetchWeatherApi
>;

describe("openmeteo client", () => {
  const today = "2023-01-03";

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(today));

    mockFetchWeatherApi.mockResolvedValue([]);
  });

  it("should get weather for a fixed location", () => {
    getWeather();

    expect(mockFetchWeatherApi).toHaveBeenCalledWith(
      "https://archive-api.open-meteo.com/v1/archive",
      expect.objectContaining({
        start_date: "2023-01-01",
        end_date: today,
        timezone: "Europe/London"
      })
    );
  });
});
