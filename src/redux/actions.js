import * as actionTypes from "./actionTypes";
import { fetchWeatherApi } from "./api";

export const fetchWeatherData = (city) => {
  return async (dispatch) => {
    try {
      const weatherData = await fetchWeatherApi(city); // Call the API function to fetch weather data
      dispatch(fetchWeatherSuccess(city, weatherData));
    } catch (error) {
      dispatch(fetchWeatherError(error.message));
    }
  };
};

export const addCity = (city) => {
  return {
    type: actionTypes.ADD_CITY,
    payload: city,
  };
};

export const removeCity = (city) => {
  return {
    type: actionTypes.REMOVE_CITY,
    payload: city,
  };
};

export const fetchWeatherSuccess = (city, weatherData) => {
  return {
    type: actionTypes.FETCH_WEATHER_SUCCESS,
    payload: {
      city,
      weatherData,
    },
  };
};

export const fetchWeatherError = (city, error) => {
  return {
    type: actionTypes.FETCH_WEATHER_ERROR,
    payload: {
      city,
      error,
    },
  };
};

export const addToFavorites = (city, weatherData) => {
  return {
    type: actionTypes.ADD_TO_FAVORITES,
    payload: {
      city,
      weatherData,
    },
  };
};

export const removeFromFavorites = (city) => {
  return {
    type: actionTypes.REMOVE_FROM_FAVORITES,
    payload: city,
  };
};
