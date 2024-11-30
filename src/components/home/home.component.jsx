"use client";
import React, { useContext, useEffect } from "react";
import { MyContext } from "@/context/context";
import InputForm from "../input-form/input-form.component";
import Results from "../results/results.component";
import { getFiveDayWeather } from "@/app/api/getWeather";
import { HomeContainer, HomeWrapper } from "./home.styles";

const Home = () => {
  // Get context values
  const {
    setUnit,
    setFiveDayData,
    setLoading,
    setFavoriteChecked,
    currentCity,
    setCurrentCity,
    setFavoriteCity,
  } = useContext(MyContext);

  useEffect(() => {
    const handleGetWeather = async () => {
      // Set loading to true
      setLoading(true);

      // Check local storage for favorite checked state
      const favoriteChecked = localStorage.getItem("favorite-checked");
      if (favoriteChecked) setFavoriteChecked(favoriteChecked);

      // Check local storage for favorite city
      const favoriteCity = localStorage.getItem("favorite-city");
      if (favoriteCity) setFavoriteCity(favoriteCity);

      // Get 5 day forecast
      const fiveDays = await getFiveDayWeather(favoriteCity || currentCity);
      setFiveDayData(fiveDays);

      // Check local storage for favorite city
      setCurrentCity(favoriteCity || currentCity);

      // Check local storage for favorite forecast unit
      const unit = localStorage.getItem("forecast-unit") || "fahrenheit";
      setUnit(unit);

      setLoading(false);
    };

    handleGetWeather();
  }, []);

  return (
    <HomeWrapper>
      <HomeContainer>
        <InputForm />
        <Results />
      </HomeContainer>
    </HomeWrapper>
  );
};

export default Home;
