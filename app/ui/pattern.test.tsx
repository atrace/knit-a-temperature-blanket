import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Pattern from "./pattern";
import { DailyWeather } from "@/lib/openmeteo";

describe("Pattern", () => {
  it("renders a knitting pattern", () => {
    const dailyWeather: DailyWeather[] = [
      {
        datetime: new Date("04/06/2024"),
        daylightDuration: 3600 * 12,
        weatherCode: 13,
        temperature2mMean: 20,
        precipitationSum: 0
      }
    ];

    const { container } = render(<Pattern dailyWeather={dailyWeather} />);

    expect(container).toMatchSnapshot();
  });
});
