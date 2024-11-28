"use client";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/context";
import InputForm from "../input-form/input-form.component";
import Results from "../results/results.component";
import getWeather from "@/app/api/getWeather";
import { HomeContainer, HomeWrapper } from "./home.styles";

const Home = () => {
  const { unit, setUnit, weatherData, setWeatherData, loading, setLoading } = useContext(MyContext);

  useEffect(() => {
    const handleGetWeather = async () => {
        setLoading(true);
      const data = await getWeather("New York");
      setWeatherData(data);
    };

    handleGetWeather();
    setUnit("fahrenheit");
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
