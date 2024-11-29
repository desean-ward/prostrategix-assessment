import React, { useContext, useEffect, useState } from "react";
import { Result, ResultsContainer, ResultsWrapper } from "./results.styles";
import Image from "next/image";
import { GridLoader } from "react-spinners";
import { MyContext } from "@/context/context";

const Results = () => {
  const {
    unit,
    setUnit,
    fiveDayData,
    loading,
    setLoading,
    setFavorite,
    favorite,
  } = useContext(MyContext);

  // Local state for checkbox
  const [isChecked, setIsChecked] = useState(false);
  const favoriteCity = JSON.parse(localStorage.getItem("forecast-city"));

  // Synchronize with localStorage on component mount
  useEffect(() => {
    if (!fiveDayData) {
      return;
    }

    const currentCity = fiveDayData?.location.name;
    if (!currentCity) {
      return null;
    }

    setUnit("fahrenheit");

    if (currentCity === favoriteCity) {
      localStorage.getItem("forecast-unit") &&
        setUnit(localStorage.getItem("forecast-unit"));
    }

    setIsChecked(fiveDayData?.location.name === favoriteCity);

    setLoading(false);
  }, [fiveDayData]);

  if (loading)
    return (
      <ResultsWrapper>
        <ResultsContainer>
          <div className='flex justify-center items-center absolute inset-0'>
            <GridLoader color='white' />
          </div>
        </ResultsContainer>
      </ResultsWrapper>
    );

  // Edit the image URL
  const imgUrl = fiveDayData
    ? `https:${fiveDayData.current.condition.icon}`
    : "";
  if (!imgUrl) {
    return null;
  }

  const currentCity = fiveDayData?.location.name;
  if (!currentCity) {
    return null;
  }

  const handleCheckboxChange = (e) => {
    // Toggle checkbox state
    const newCheckedState = e.target.checked;
    setIsChecked(newCheckedState);

    if (newCheckedState) {
      setFavorite(true);

      localStorage.setItem("forecast-unit", unit);
      localStorage.setItem("forecast-city", JSON.stringify(currentCity));
    } else {
      setFavorite(false);
      setUnit(null);
      localStorage.removeItem("forecast-city");
      localStorage.removeItem("forecast-unit");
    }
  };

  return (
    <ResultsWrapper>
      <ResultsContainer>
        <Result className={loading ? "hidden" : ""}>
          <Image src={imgUrl} alt='Image' width={100} height={100} />

          {unit && unit === "fahrenheit" ? (
            <p className='text-3xl'>{fiveDayData.current.temp_f}° F</p>
          ) : (
            <p className='text-3xl'>{fiveDayData.current.temp_c}° C</p>
          )}
          <p>{fiveDayData.location.name}</p>
          {/* <p className='text-3xl'>{fiveDayData.current.condition.text}</p> */}
          <p>
            <input
              type='checkbox'
              className='mr-2'
              checked={isChecked}
              onClick={handleCheckboxChange}
            />
            Save As Favorite
          </p>
        </Result>
      </ResultsContainer>
    </ResultsWrapper>
  );
};

export default Results;
