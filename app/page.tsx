import { getWeather } from "./lib/openmeteo";
import Home from "./ui/Home";

export default async function HomePage() {
  const dailyWeather = await getWeather();

  return (
    <main>
      <Home dailyWeather={dailyWeather} />
    </main>
  );
}
