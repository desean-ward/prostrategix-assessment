"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  InputFormWrapper,
  InputFormContainer,
  InputFormInput,
} from "./input-form.styles";
import { getFiveDayWeather } from "@/app/api/getWeather";
import { MyContext } from "@/context/context";

const InputForm = () => {
  const {
    unit,
    setUnit,
    setFiveDayData,
    setLoading,
    currentCity,
    setCurrentCity,
  } = useContext(MyContext);

  // Handle input change
  const handleInputChange = (e) => {
    e.preventDefault();
    setCurrentCity(e.target.value);
  };

  // Get the current weather
  const handleGetWeather = async () => {
    setLoading(true);

    const fiveDays = await getFiveDayWeather(currentCity);

    setTimeout(() => {
      setFiveDayData(fiveDays);
      setLoading(false);
    }, 1000);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  useEffect(() => {
    setUnit("fahrenheit");
  }, []);

  return (
    <InputFormWrapper>
      <InputFormContainer>
        <form
          action={handleGetWeather}
          className='flex flex-col w-full gap-8 px-12 -mt-4'
        >
          <div className='flex flex-col gap-4 px-4 py-12 rounded-lg '>
            <p className='text-3xl font-semibold'>Anytime Weather</p>
            <p>Enter city below</p>

            {/* Input field */}
            <InputFormInput
              name='city'
              type='text'
              value={currentCity}
              onChange={handleInputChange}
            />

            {/* Radio Buttons */}
            <div className='flex gap-8'>
              <span className='flex gap-2 text-2xl'>
                <input
                  type='radio'
                  id='fahrenheit'
                  name='temperature'
                  value='fahrenheit'
                  checked={unit === "fahrenheit"}
                  className='cursor-pointer'
                  onChange={handleUnitChange}
                />{" "}
                F
              </span>

              <span className='flex gap-2 text-2xl'>
                <input
                  type='radio'
                  id='celcius'
                  name='temperature'
                  value='celcius'
                  checked={unit === "celcius"}
                  className='cursor-pointer hover:bg-gradient-to-r g-gradient-to-b hovefrom-black to-slate-800'
                  onChange={handleUnitChange}
                />{" "}
                C
              </span>
            </div>
          </div>

          {/* Submit button */}
          <button
            type='submit'
            className='w-full p-2 text-2xl font-bold text-black duration-300 ease-in-out bg-white border border-black rounded-lg hover:text-white hover:bg-gradient-to-r from-black to-slate-800 trasition-colors hover:border-white/50 hover:dhadow-black hover:shadow-2xl'
          >
            Enter
          </button>
        </form>
      </InputFormContainer>
    </InputFormWrapper>
  );
};

export default InputForm;
