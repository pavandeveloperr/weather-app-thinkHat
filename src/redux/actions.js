import * as actionTypes from "./actionTypes";

export const addCity = (city) => {
  return {
    type: actionTypes.ADD_CITY, // Action type constant for adding a city
    payload: city, // Data payload, in this case, the city name
  };
};

export const deleteCity = (city) => {
  return {
    type: actionTypes.DELETE_CITY, // Action type constant for deleting a city
    payload: city, // Data payload, in this case, the city name
  };
};

export const fetchWeatherSuccess = (city, weatherData) => {
  return {
    type: actionTypes.FETCH_WEATHER_SUCCESS, // Action type constant for successful weather data fetch
    payload: {
      city, // Data payload, city name
      weatherData, // Data payload, weather data for the city
    },
  };
};

export const fetchWeatherError = (city, error) => {
  return {
    type: actionTypes.FETCH_WEATHER_ERROR, // Action type constant for weather data fetch error
    payload: {
      city, // Data payload, city name
      error, // Data payload, error message or object describing the error
    },
  };
};

export const addToFavorites = (city, weatherData) => {
  return {
    type: actionTypes.ADD_TO_FAVORITES, // Action type constant for adding a city to favorites
    payload: {
      city, // Data payload, city name
      weatherData, // Data payload, weather data for the city
    },
  };
};

export const removeFromFavorites = (city) => {
  return {
    type: actionTypes.REMOVE_FROM_FAVORITES, // Action type constant for removing a city from favorites
    payload: city, // Data payload, in this case, the city name
  };
};
