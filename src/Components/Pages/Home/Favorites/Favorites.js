import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../../../../redux/actions";
import "../Favorites/Favorites.css";
import { toast } from "react-hot-toast";

const Favorites = () => {
  const favoriteCities = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    // Save favorites to localStorage
    localStorage.setItem("favorites", JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  const handleRemoveFavorite = (city) => {
    dispatch(removeFromFavorites(city));
    toast.error("City removed from favorites!");
  };

  return (
    <div className="main-container">
      <div className="content">
        <div className="fav-city-header">
          <h3>My Favorite Cities</h3>
        </div>
        {favoriteCities.length === 0 ? (
          <p className="info-text">
            Please add cities to view your favorite cities.
          </p>
        ) : (
          <div className="fav-card-container">
            {favoriteCities.map((favorite) => (
              <div className="fav-weather-card" key={favorite.city}>
                <div className="city-name">
                  <h4>{favorite.city}</h4>
                  <FaStar
                    className="star-icon"
                    onClick={() => handleRemoveFavorite(favorite.city)}
                  />
                </div>
                <div className="weather-deatils">
                  <div className="details">
                    <p>
                      Temperature:{" "}
                      {favorite.weatherData &&
                        Math.round(
                          favorite.weatherData.main.temp - 273.15
                        )}{" "}
                      °C
                    </p>
                    <p>
                      Description:{" "}
                      {favorite.weatherData &&
                        favorite.weatherData.weather[0].description}
                    </p>
                    <p>
                      Humidity:{" "}
                      {favorite.weatherData &&
                        favorite.weatherData.main.humidity}{" "}
                      %
                    </p>
                    <p>
                      Wind Speed:{" "}
                      {favorite.weatherData && favorite.weatherData.wind.speed}{" "}
                      km/h
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
