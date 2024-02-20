import { getWeather } from "@/lib/openmeteo";
import Link from "@/ui/Link";
import PrintablePattern from "@/ui/print-a-pattern/PrintablePattern";

const PrintAPattern = async () => {
  const dailyWeather = await getWeather();

  return (
    <main>
      <Link href={"/"}>back home</Link>
      <p>Here&apos;s a customisable printable pattern!</p>
      <br />
      <PrintablePattern dailyWeather={dailyWeather} />
    </main>
  );
};

export default PrintAPattern;
