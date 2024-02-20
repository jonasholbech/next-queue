"use client";
import { createContext, useState } from "react";

export const ValueContext = createContext();
export const StateContext = createContext();

export function ErrorContext({ children }) {
  const [error, setError] = useState(null);
  return (
    <ValueContext.Provider value={error}>
      <StateContext.Provider value={setError}>{children}</StateContext.Provider>
    </ValueContext.Provider>
  );
}
