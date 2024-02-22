"use client";
import { knitFont } from "@/font";
import { checkBrowserTextWrapCompatible } from "@/lib/getBrowserInfo";
import { useEffect, useState } from "react";

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

export const Header = () => {
  let [textWrapCompatible, setTextWrapCompatible] = useState(false);

  useEffect(() => {
    // Must use browser window stuff in useEffect
    setTextWrapCompatible(checkBrowserTextWrapCompatible(navigator.userAgent));
  }, [setTextWrapCompatible]);

  return (
    <div className="mb-4">
      <h1
        className={`hidden overflow-hidden text-nowrap lg:flex lg:justify-center ${knitFont.className}`}
      >
        {makeKnittedFont("❅ Knit a temperature blanket ❅", textWrapCompatible)}
      </h1>
      <h1
        className={`hidden overflow-hidden text-nowrap sm:flex sm:justify-center lg:hidden ${knitFont.className}`}
      >
        {makeKnittedFont("Temperature blanket", textWrapCompatible)}
      </h1>
      <h1
        className={`flex justify-center overflow-hidden leading-8 sm:hidden ${knitFont.className}`}
      >
        {makeKnittedFont("Knit a", textWrapCompatible) +
          "\n" +
          makeKnittedFont("blanket", textWrapCompatible)}
      </h1>
    </div>
  );
};
