"use client";
import React, { useContext, useEffect } from "react";
import { MyContext } from "@/context/context";
import InputForm from "../input-form/input-form.component";
import Results from "../results/results.component";
import { getFiveDayWeather } from "@/app/api/getWeather";
import { HomeContainer, HomeWrapper } from "./home.styles";

const Home = () => {
  const { unit, setUnit, setFiveDayData, setLoading } = useContext(MyContext);

  useEffect(() => {
    const handleGetWeather = async () => {
      setLoading(true);

      // Check local storage for favorite city
      const favoriteCity =
        JSON.parse(localStorage.getItem("forecast-city")) || "New York City";
      const fiveDays = await getFiveDayWeather(favoriteCity);

      const unit = localStorage.getItem("forecast-unit") || "fahrenheit";

      setFiveDayData(fiveDays);
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
