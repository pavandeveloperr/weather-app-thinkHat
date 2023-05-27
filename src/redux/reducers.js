import * as actionTypes from "./actionTypes";

// Retrieve stored cities and favorites from localStorage
const storedCities = localStorage.getItem("cities");

const favoriteCities = localStorage.getItem("favorites");

// Define initial state for the Redux store
const initialState = {
  cities: storedCities ? JSON.parse(storedCities) : [], // List of cities
  weatherData: [], // Weather data for cities
  favorites: favoriteCities ? JSON.parse(favoriteCities) : [], // List of favorite cities
  error: null, //Error information if applicable
};

// Reducer function for managing the state related to cities.
export const citiesReducer = (state = initialState.cities, action) => {
  switch (action.type) {
    case actionTypes.ADD_CITY:
      // Check if the city already exists in the state
      if (state.includes(action.payload)) {
        return state; // City already exists, no need to add it again
      }
      return [...state, action.payload];

    case actionTypes.DELETE_CITY:
      // Remove the city from the state
      const updatedState = state.filter((city) => city !== action.payload);
      localStorage.setItem("cities", JSON.stringify(updatedState)); // Update localStorage
      return updatedState;
    default:
      return state;
  }
};

// Reducer function for managing the state related to weather data.
export const weatherReducer = (state = initialState.weatherData, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WEATHER_SUCCESS:
      // Update weather data for a city or add it if it doesn't exist
      return [
        ...state.filter((city) => city.name !== action.payload.city), // Remove existing data for the city
        action.payload.weatherData, // Add the new weather data
      ];

    case actionTypes.FETCH_WEATHER_ERROR:
      // Handle error
      return state;

    case actionTypes.DELETE_CITY:
      // Remove the city's weather data from the state
      return state.filter((city) => city.name !== action.payload);

    default:
      return state;
  }
};

// Reducer function for managing the state related to favorite cities.
export const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_FAVORITES:
      const { city, weatherData } = action.payload;
      const existingFavorite = state.favorites.find(
        (favorite) => favorite.city === city
      );

      if (existingFavorite) {
        // If the city already exists in favorites, update its weather data
        return {
          ...state,
          favorites: state.favorites.map((favorite) =>
            favorite.city === city ? { ...favorite, weatherData } : favorite
          ),
        };
      } else {
        // If the city is new, add it to favorites
        return {
          ...state,
          favorites: [
            ...state.favorites,
            {
              city,
              weatherData,
            },
          ],
        };
      }
    case actionTypes.REMOVE_FROM_FAVORITES:
      // Remove a city from favorites
      const updatedFavorites = state.favorites.filter(
        (favorite) => favorite.city !== action.payload
      );
      return {
        ...state,
        favorites: updatedFavorites,
      };
    default:
      return state;
  }
};
