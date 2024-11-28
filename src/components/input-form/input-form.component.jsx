import React, { useContext, useEffect, useRef, useState } from "react";
import {
  InputFormWrapper,
  InputFormContainer,
  InputFormInput,
} from "./input-form.styles";
import getWeather from "@/app/api/getWeather";
import { MyContext } from "@/context/context";

const InputForm = () => {
  const [city, setCity] = useState(null);
  const { unit, setUnit, weatherData, setWeatherData, setLoading } =
    useContext(MyContext);
  const fRef = useRef(null);
  const cRef = useRef(null);

  const handleInputChange = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  // Get the current weather
  const handleGetWeather = async () => {
    setWeatherData(null);
    setLoading(true);
    const data = await getWeather(city);

    setTimeout(() => {
      setWeatherData(data);
    }, 2000);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  useEffect(() => {
    if (weatherData !== null) {
      setLoading(false);
    }
  }, [setLoading, weatherData]);

  return (
    <InputFormWrapper>
      <InputFormContainer>
        <form
          action={handleGetWeather}
          method='post'
          className='flex flex-col gap-4'
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
                  defaultChecked={unit === "fahrenheit"}
                  className='cursor-pointer'
                  onClick={handleUnitChange}
                />{" "}
                F
              </span>

              <span>
                <input
                  type='radio'
                  id='celcius'
                  name='temperature'
                  value='celcius'
                  defaultChecked={unit === "celcius"}
                  className='cursor-pointer'
                  onClick={handleUnitChange}
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
