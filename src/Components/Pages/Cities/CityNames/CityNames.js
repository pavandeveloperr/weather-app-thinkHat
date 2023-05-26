import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { RiAddBoxFill } from "react-icons/ri";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Modal from "../Modal/Modal";
import "./CityNames.css";
import { addToFavorites, removeFromFavorites } from "../../../../redux/actions";
import toast from "react-hot-toast";

import {
  addCity,
  fetchWeatherSuccess,
  fetchWeatherError,
} from "../../../../redux/actions";

const CityNames = ({
  cities,
  weatherData,
  addCity,
  fetchWeatherSuccess,
  fetchWeatherError,
  addToFavorites,
  removeFromFavorites,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(() => {
    const savedSelectedCity = localStorage.getItem("selectedCity");
    return savedSelectedCity ? JSON.parse(savedSelectedCity) : null;
  });

  const favoriteCities = useSelector((state) => state.favorites.favorites);

  useEffect(() => {
    const savedCities = localStorage.getItem("cities");
    const savedSelectedCity = localStorage.getItem("selectedCity");

    if (savedCities) {
      const parsedCities = JSON.parse(savedCities);
      parsedCities.forEach((city) => {
        fetchWeather(city);
      });
    }
    console.log(cities);

    if (savedSelectedCity) {
      setSelectedCity(JSON.parse(savedSelectedCity));
    }
  }, []);

  const fetchWeather = (city) => {
    // Check if weather data for the city already exists
    const existingWeatherData = weatherData.find((data) => data.name === city);
    if (existingWeatherData) {
      return; // Weather data already exists, no need to make an API call
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e63617123ab41c549d722edad76bcc5b`
    )
      .then((response) => response.json())
      .then((data) => {
        fetchWeatherSuccess(city, data);
      })
      .catch((error) => {
        fetchWeatherError(city, error);
      });
    console.log("fetcherweather", cities);
  };

  const handleAddCityClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCity = (city) => {
    if (cities.includes(city)) {
      toast.error("City already exists!");
    } else {
      fetchWeather(city);
      addCity(city);
      toast.success("City added successfully!");
    }
  };

  const handleAddToFavorites = (city) => {
    if (isCityFavorite(city)) {
      removeFromFavorites(city);
      toast.error("City removed from favorites!");
    } else {
      const cityWeatherData = weatherData.find(
        (cityData) => cityData.name === city
      );
      addToFavorites(city, cityWeatherData);
      toast.success("City added to favorites!");
    }
  };

  const isCityFavorite = (city) => {
    return favoriteCities.some((favorite) => favorite.city === city);
  };

  const handleCityCardClick = (city) => {
    setSelectedCity(city === selectedCity ? null : city);
  };

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
    localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
  }, [cities, selectedCity]);

  // console.log(cities);
  return (
    <div className="main-container">
      <div className="cities-container">
        <div className="city-list">
          <div className="city-title">
            <p>Cities</p>
            <span>
              <RiAddBoxFill
                className="Add-city-btn"
                onClick={handleAddCityClick}
              />
            </span>
          </div>
          {weatherData.map((city) => (
            <div
              key={city.id}
              className={`city-card ${
                selectedCity === city.name ? "selected" : ""
              }`}
              onClick={() => handleCityCardClick(city.name, false)}
            >
              <div>
                <p>{city.name}</p>
                <small>{Math.round(city.main.temp - 273.15)} °C</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="city-weather-container">
        {selectedCity && (
          <div>
            <div className="selected-city">
              <p>{selectedCity}</p>
              <span
                onClick={() => handleAddToFavorites(selectedCity)}
                className="star-icon"
              >
                {isCityFavorite(selectedCity) ? (
                  <AiFillStar />
                ) : (
                  <AiOutlineStar />
                )}
              </span>
            </div>
            <div className="weather-content-box">
              <div className="weather-details">
                {weatherData.map((city) => {
                  if (city.name === selectedCity) {
                    return (
                      <div key={city.name}>
                        <p>
                          Temperature:{" "}
                          {city.main && Math.round(city.main.temp - 273.15)} °C
                        </p>
                        <p>
                          Description:{" "}
                          {city.weather && city.weather[0].description}
                        </p>
                        {/* Display other weather information as needed */}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} onAddCity={handleAddCity} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    weatherData: state.weatherData,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCity: (city) => {
      dispatch(addCity(city));
    },
    fetchWeatherSuccess: (city, weatherData) =>
      dispatch(fetchWeatherSuccess(city, weatherData)),
    fetchWeatherError: (city, error) =>
      dispatch(fetchWeatherError(city, error)),
    addToFavorites: (city, weatherData) => {
      dispatch(addToFavorites(city, weatherData));
    },
    removeFromFavorites: (city) => {
      dispatch(removeFromFavorites(city));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityNames);
