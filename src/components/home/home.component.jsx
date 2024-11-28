"use client";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/context";
import InputForm from "../input-form/input-form.component";
import Results from "../results/results.component";
import getWeather from "@/app/api/getWeather";

const Home = () => {
  const { unit, setUnit, weatherData, setWeatherData } = useContext(MyContext);

  useEffect(() => {
    const handleGetWeather = async () => {
      const data = await getWeather("New York");
      setWeatherData(data);
    };

    handleGetWeather();
    setUnit("fahrenheit");
  }, []);

  return (
    <div
      className='flex justify-center items-center gap-8
    '
    >
      <InputForm />
      <Results />
    </div>
  );
};

export default Home;
