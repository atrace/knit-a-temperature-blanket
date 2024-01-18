import { getWeather } from "./openmeteo";

const calculateKnitting = (): string => {
  getWeather();
  return "here is a pattern";
};

export default function Home() {
  return (
    <main>
      <text>Hello world</text>
      <br />
      <br />
      <text>{calculateKnitting()}</text>
    </main>
  );
}
