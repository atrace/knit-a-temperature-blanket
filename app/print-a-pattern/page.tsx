import { getWeather } from "@/lib/openmeteo";
import PrintablePattern from "@/ui/print-a-pattern/PrintablePattern";
import React from "react";

const PrintAPattern = async () => {
  const dailyWeather = await getWeather();

  return (
    <main>
      <p>Only with the default temp range so far - no custom colours :(</p>
      <br />
      <PrintablePattern dailyWeather={dailyWeather} />
    </main>
  );
};

export default PrintAPattern;
