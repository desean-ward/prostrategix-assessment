"use server";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file. dotenv.config();
export const getFiveDayWeather = async (city) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no`;

  try {
    const response = await axios.get(apiUrl);

    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
