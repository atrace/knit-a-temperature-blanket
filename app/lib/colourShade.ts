export const colourShade = (colour: string, amount: number) => {
  return (
    "#" +
    colour
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).slice(-2),
      )
  );
};
