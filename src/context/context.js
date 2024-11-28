"use client";
import { createContext, useState } from "react";

export const MyContext = createContext({
  unit: null,
  setUnit: () => {},
  weatherData: null,
  setWeatherData: () => {},
  loading: null,
  setLoading: () => {},
});

export const ContextProvider = ({ children }) => {
  const [unit, setUnit] = useState("fahrenheit");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <MyContext.Provider
      value={{
        unit,
        setUnit,
        weatherData,
        setWeatherData,
        loading,
        setLoading,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
