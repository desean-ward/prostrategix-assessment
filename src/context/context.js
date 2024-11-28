"use client";
import { createContext, useState } from "react";

export const MyContext = createContext({
  unit: null,
  setUnit: () => {},
  weatherData: null,
  setWeatherData: () => {},
});

export const ContextProvider = ({ children }) => {
  const [unit, setUnit] = useState("fahrenheit");
  const [weatherData, setWeatherData] = useState(null);

  return (
    <MyContext.Provider value={{ unit, setUnit, weatherData, setWeatherData }}>
      {children}
    </MyContext.Provider>
  );
};
