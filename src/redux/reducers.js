import * as actionTypes from "./actionTypes";

const storedCities = localStorage.getItem("cities");

const favoriteCities = localStorage.getItem("favorites");

const initialState = {
  cities: storedCities ? JSON.parse(storedCities) : [],
  weatherData: [],
  favorites: favoriteCities ? JSON.parse(favoriteCities) : [], // New favorites list
  error: null,
};

export const citiesReducer = (state = initialState.cities, action) => {
  switch (action.type) {
    case actionTypes.ADD_CITY:
      if (state.includes(action.payload)) {
        return state;
      }
      return [...state, action.payload];

    case actionTypes.DELETE_CITY:
      const updatedState = state.filter((city) => city !== action.payload);
      localStorage.setItem("cities", JSON.stringify(updatedState));
      return updatedState;
    default:
      return state;
  }
};

export const weatherReducer = (state = initialState.weatherData, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WEATHER_SUCCESS:
      return [
        ...state.filter((city) => city.name !== action.payload.city),
        action.payload.weatherData,
      ];

    case actionTypes.FETCH_WEATHER_ERROR:
      // Handle error if needed
      return state;

    case actionTypes.DELETE_CITY:
      return state.filter((city) => city.name !== action.payload);

    default:
      return state;
  }
};

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
