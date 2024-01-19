import React from "react";
import ColourKey from "./ui/colourKey";
import Pattern from "./ui/pattern";
import { getWeather } from "./lib/openmeteo";

export default async function Home() {
  const dailyWeather = await getWeather();

  return (
    <main>
      <h1>Knit a temperature blanket</h1>
      <br />
      <ColourKey />
      <br />
      <Pattern dailyWeather={dailyWeather} />
    </main>
  );
}
