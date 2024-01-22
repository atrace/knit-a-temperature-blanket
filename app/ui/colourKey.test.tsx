import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ColourKey from "./colourKey";

describe("ColourKey", () => {
  it("renders a colour key", () => {
    const { container } = render(<ColourKey />);
    expect(container).toMatchSnapshot();
  });
});
