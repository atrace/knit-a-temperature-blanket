import { getWeather } from "./lib/openmeteo";
import Home from "./ui/Home";

const HomePage = async () => {
  const dailyWeather = await getWeather();

  return (
    <main>
      <Home dailyWeather={dailyWeather} />
    </main>
  );
};

export default HomePage;