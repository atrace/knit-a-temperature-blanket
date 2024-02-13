"use client";
import { defaultTemperatureKey } from "@/lib/getColourForTemperature";
import React, { createContext, useContext } from "react";

// Context is read-only, so I think this wouldn't work as-is (unless we were only allowing default temp key)
// To get this working I think the value we initialise context with would have to provide methods of altering the initial value
// I tried writing a service for this (thinking back to previous context experience) but this wouldn't work as the service is not stateful
// i.e. i can provide the alteration methods but the consumer component would still have to provide the data to be mutated
// so the current state of the temp component would be mastered elsewhere - defeating the point of using context for sharing data between components - i"d only be sharing the methods for changing it
// One way to make this work would be to create a temperature Key class which would master the state and the methods for mutating it. Then instantiate it here and pass around components
// This feels like a bad vibe and very non-functional, so I'm looking into alternatives for now.

// One alternative is using a react reducer https://react.dev/learn/extracting-state-logic-into-a-reducer
// but this also feels icky and heavy-handed currently. Might be worth returning to when the temp key gets more complicated.

// For now, will just try out making use of local storage as the single source of truth, seeing as this app already utilises it.
// Will still need to use react state hooks in order for the components to rerender based on it changing
// So this might end up with some duplication in the colour key and the blanket renderer.

const TemperatureKeyContext = createContext(defaultTemperatureKey);

const ContextWrapper: React.FC<React.AllHTMLAttributes<{}>> = ({
  children,
}) => {
  // Put in component where it needs to be used!
  const temperatureKey = useContext(TemperatureKeyContext);

  return (
    <TemperatureKeyContext.Provider value={temperatureKey}>
      {children}
    </TemperatureKeyContext.Provider>
  );
};

export default ContextWrapper;
