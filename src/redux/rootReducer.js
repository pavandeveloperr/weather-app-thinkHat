import { combineReducers } from "redux";
import { citiesReducer, favoriteReducer, weatherReducer } from "./reducers";

const rootReducer = combineReducers({
  cities: citiesReducer,
  weatherData: weatherReducer,
  favorites: favoriteReducer,
});

export default rootReducer;
