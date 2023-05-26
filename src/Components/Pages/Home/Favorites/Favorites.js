import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { RiAddBoxFill } from "react-icons/ri";
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
          <div className="add-btn">
            <span>Add new City</span>
            <RiAddBoxFill className="btn" />
          </div>
        </div>
        {favoriteCities.length === 0 ? (
          <p>Please add cities to view your favorite cities.</p>
        ) : (
          <div className="card-container">
            {favoriteCities.map((favorite) => (
              <div className="weather-card" key={favorite.city}>
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
