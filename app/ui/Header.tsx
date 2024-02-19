import { knitFont } from "@/font";

// const maxKnittedHeaderLength = 44;
const maxKnittedHeaderLength = 100;

const makeKnittedFont = (
  message: string,
  addPadding: boolean = true,
): string => {
  let knittedMessage = `(${message.replaceAll(" ", "_")})`;

  if (!addPadding) return knittedMessage;

  const paddingNeeded = Math.floor(
    (maxKnittedHeaderLength - knittedMessage.length) / 2,
  );

  if (paddingNeeded <= 0) return knittedMessage;

  knittedMessage = knittedMessage.padEnd(
    knittedMessage.length + paddingNeeded,
    "#",
  );
  knittedMessage = knittedMessage.padStart(
    knittedMessage.length + paddingNeeded,
    "#",
  );

  return knittedMessage;
};

export const Header = () => (
  <div className="mb-4">
    <h1
      className={`hidden overflow-hidden lg:flex lg:justify-center ${knitFont.className}`}
    >
      {makeKnittedFont("❅ Knit a temperature blanket ❅")}
    </h1>
    <h1
      className={`hidden overflow-hidden sm:flex sm:justify-center lg:hidden ${knitFont.className}`}
    >
      {makeKnittedFont("Temperature blanket")}
    </h1>
    <h1
      className={`flex justify-center overflow-hidden leading-8 sm:hidden ${knitFont.className}`}
    >
      {makeKnittedFont("Knit a") + "\n" + makeKnittedFont("blanket")}
    </h1>
  </div>
);
