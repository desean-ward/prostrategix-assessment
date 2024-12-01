"use client";
import useWeatherStore from "@/app/stores/weather-store";
import {
  InputFormWrapper,
  InputFormContainer,
  InputFormInput,
} from "./input-form.styles";
import { getFiveDayWeather } from "@/app/api/getWeather";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedButton from "@/app/ui/animated-button/animated-button.ui";

const InputForm = () => {
  const {
    unit,
    setUnit,
    setFiveDayData,
    setLoading,
    currentCity,
    setCurrentCity,
  } = useWeatherStore();

  // Handle input change
  const handleInputChange = (e) => {
    e.preventDefault();
    setCurrentCity(e.target.value);
  };

  // Get the current weather
  const handleGetWeather = async () => {
    setLoading(true);

    const fiveDays = await getFiveDayWeather(currentCity);

    setFiveDayData(fiveDays);
    setLoading(false);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  useGSAP(() => {
    const timeline = gsap.timeline();
    timeline
      .from(["#form-input"], {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "easeIn",
      })
      .from(["#title"], {
        opacity: 0,
        duration: 0.5,
        ease: "easeIn",
        delay: 2,
      });
  }, []);

  return (
    <InputFormWrapper id='form-input'>
      <InputFormContainer>
        <form
          action={handleGetWeather}
          className='flex flex-col justify-center w-full gap-8 px-4 size-full'
        >
          {/* Title */}
          <div className='flex flex-col gap-4 rounded-lg '>
            <p id='title' className='py-4 mb-8 text-4xl font-semibold tracking-wider shadow-lg shadow-black'>
              Anytime
              <span className='bg-gradient-to-r from-[#272781] via-[#F0A606] to-[#272781] text-transparent bg-clip-text'>
                Weather
              </span>
            </p>
            <p className="text-start">Enter city below</p>

            {/* Input field */}
            <InputFormInput
              name='city'
              type='text'
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
          <AnimatedButton type='submit' className="shadow-xl shadow-black">Enter</AnimatedButton>
        </form>
      </InputFormContainer>
    </InputFormWrapper>
  );
};

export default InputForm;
