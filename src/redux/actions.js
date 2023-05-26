import * as actionTypes from "./actionTypes";

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
