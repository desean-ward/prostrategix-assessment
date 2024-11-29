import React, { useContext, useState } from "react";
import {
  InputFormWrapper,
  InputFormContainer,
  InputFormInput,
} from "./input-form.styles";
import { getFiveDayWeather } from "@/app/api/getWeather";
import { MyContext } from "@/context/context";

const InputForm = () => {
  const [city, setCity] = useState(null);
  const { unit, setUnit, fiveDayData, setFiveDayData, setLoading } =
    useContext(MyContext);

  const handleInputChange = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  // Get the current weather
  const handleGetWeather = async () => {
    setLoading(true);
    setUnit(null);

    const fiveDays = await getFiveDayWeather(city);

    setTimeout(() => {
      setFiveDayData(fiveDays);
      setLoading(false);
    }, 1000);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    localStorage.setItem("forecast-unit", e.target.value);
  };

  return (
    <InputFormWrapper>
      <InputFormContainer>
        <form
          action={handleGetWeather}
          className='flex flex-col gap-4 shadow-xl shadow-black'
        >
          <div className='bg-white text-black flex flex-col gap-4 rounded-lg p-4'>
            <p className='text-3xl font-semibold'>Anytime Weather</p>
            <p>Enter city below</p>

            {/* Input field */}
            <InputFormInput
              name='city'
              type='text'
              onChange={handleInputChange}
            />

            {/* Radio Buttons */}
            <div className='flex gap-8'>
              <span>
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

              <span>
                <input
                  type='radio'
                  id='celcius'
                  name='temperature'
                  value='celcius'
                  checked={unit === "celcius"}
                  className='cursor-pointer'
                  onChange={handleUnitChange}
                />{" "}
                C
              </span>
            </div>
          </div>

          {/* Submit button */}
          <button
            type='submit'
            className='border border-black bg-white text-black p-2 rounded-lg'
          >
            Enter
          </button>
        </form>
      </InputFormContainer>
    </InputFormWrapper>
  );
};

export default InputForm;
