"use server";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file. dotenv.config();
const getWeather = async (city) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&days=1&aqi=no`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getWeather;
