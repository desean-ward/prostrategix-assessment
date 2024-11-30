"use client";
import { createContext, useState } from "react";

export const MyContext = createContext({
  unit: null,
  setUnit: () => {},
  fiveDayData: null,
  setFiveDayData: () => {},
  loading: false,
  setLoading: () => {},
  favoriteChecked: false,
  setFavoriteChecked: () => {},
  favoriteCity: null,
  setFavoriteCity: () => {},
  currentCity: null,
  setCurrentCity: () => {},
});

export const ContextProvider = ({ children }) => {
  const [unit, setUnit] = useState("fahrenheit");
  const [fiveDayData, setFiveDayData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [favoriteChecked, setFavoriteChecked] = useState(null);
  const [favoriteCity, setFavoriteCity] = useState(
    localStorage.getItem("favorite-city")
  );
  const [currentCity, setCurrentCity] = useState("New York");

  return (
    <MyContext.Provider
      value={{
        unit,
        setUnit,
        fiveDayData,
        setFiveDayData,
        loading,
        setLoading,
        favoriteChecked,
        setFavoriteChecked,
        favoriteCity,
        setFavoriteCity,
        currentCity,
        setCurrentCity,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
