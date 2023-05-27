import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { RiAddBoxFill } from "react-icons/ri";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import Modal from "../Modal/Modal";
import "./CityWeather.css";
import {
  addToFavorites,
  deleteCity,
  removeFromFavorites,
  addCity,
  fetchWeatherSuccess,
  fetchWeatherError,
} from "../../../../redux/actions";
import toast from "react-hot-toast";

const CityNames = ({
  cities,
  weatherData,
  addCity,
  fetchWeatherSuccess,
  fetchWeatherError,
  addToFavorites,
  removeFromFavorites,
  deleteCity,
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
    //eslint-disable-next-line
  }, []);

  //Fetches weather data for the given city from the OpenWeatherMap API.
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
  };

  // Handles the click event on the "Add City" button and opens the modal.
  const handleAddCityClick = () => {
    setIsModalOpen(true);
  };

  // Closes the modal.
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Adds a new city to the list and fetches its weather data.
  const handleAddCity = (city) => {
    if (cities.includes(city)) {
      toast.error("City already exists!");
    } else {
      fetchWeather(city);
      addCity(city);
      toast.success("City added successfully!");
    }
  };

  // Adds or removes a city from the favorites list.
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

  // Checks if a city is in the favorites list.
  const isCityFavorite = (city) => {
    return favoriteCities.some((favorite) => favorite.city === city);
  };

  // Handles the click event on a city card and updates the selected city.
  const handleCityCardClick = (city) => {
    setSelectedCity(city === selectedCity ? null : city);
  };

  // Handles the deletion of a city from the list.
  const handleDeleteCity = (city) => {
    deleteCity(city);
    removeFromFavorites(city);
    //eslint-disable-next-line
    const updatedWeatherData = weatherData.filter((data) => data.name !== city);
    fetchWeatherError(city, null); // Remove the city from the weatherData state in Redux store

    if (selectedCity === city) {
      setSelectedCity(null);
      localStorage.removeItem("selectedCity");
    }

    const storedCities = localStorage.getItem("cities");
    if (storedCities) {
      const parsedCities = JSON.parse(storedCities);
      const updatedCities = parsedCities.filter((c) => c !== city);
      localStorage.setItem("cities", JSON.stringify(updatedCities));
    }

    toast.success("City deleted successfully!");
  };

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
    localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
  }, [cities, selectedCity]);

  const storedCities = localStorage.getItem("cities");

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
              <BsTrashFill
                className="delete-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCity(city.name);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="city-weather-container">
        {selectedCity ? (
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
            <div className="weather-cards">
              {weatherData.map((city) => {
                if (city.name === selectedCity) {
                  return (
                    <div className="card-container">
                      <div key={city.name} className="weather-card">
                        <span className="weather-category">Temperature: </span>
                        <h3>
                          {city.main && Math.round(city.main.temp - 273.15)} °C
                        </h3>
                      </div>
                      <div className="weather-card">
                        <span className="weather-category">Description: </span>
                        <h3>{city.weather && city.weather[0].description}</h3>
                      </div>
                      <div className="weather-card">
                        <span className="weather-category">Humidity:</span>{" "}
                        <h3>{city.main && city.main.humidity} %</h3>
                      </div>
                      <h3>
                        Wind speed: {city.weather && city.wind.speed} km/h
                      </h3>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ) : cities.length === 0 &&
          (!storedCities || JSON.parse(storedCities).length === 0) ? (
          <div className="empty-message">
            Add cities to view the weather details.
          </div>
        ) : null}
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} onAddCity={handleAddCity} />
      )}
    </div>
  );
};

// Maps the state from the Redux store to the component props.
const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    weatherData: state.weatherData,
    favorites: state.favorites,
  };
};

// Maps the dispatch function to the component props.
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
    deleteCity: (city) => {
      dispatch(deleteCity(city));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityNames);
