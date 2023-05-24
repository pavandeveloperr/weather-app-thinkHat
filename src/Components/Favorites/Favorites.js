import React from "react";
import { FaStar } from "react-icons/fa";
import { RiAddBoxFill } from "react-icons/ri";
import "./Favorites.css";

const Favorites = () => {
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
        <div className="card-container">
          <div className="weather-card">
            <div className="city-name">
              <h4>City Name</h4>
              <FaStar />
            </div>
            <div className="weather-deatils">
              <div className="details">falkfjaklfjajkdfadfamalf</div>
            </div>
          </div>
          <div className="weather-card">
            <div className="city-name">
              <h4>City Name</h4>
              <FaStar style={{ color: "gold" }} />
            </div>
            <div className="weather-deatils">
              <div className="details">falkfjaklfjajkdfadfamalf</div>
            </div>
          </div>
          <div className="weather-card">
            <div className="city-name">
              <h4>City Name</h4>
              <FaStar />
            </div>
            <div className="weather-deatils">
              <div className="details">falkfjaklfjajkdfadfamalf</div>
            </div>
          </div>
          <div className="weather-card">
            <div className="city-name">
              <h4>City Name</h4>
              <FaStar />
            </div>
            <div className="weather-deatils">
              <div className="details">falkfjaklfjajkdfadfamalf</div>
            </div>
          </div>
          <div className="weather-card">
            <div className="city-name">
              <h4>City Name</h4>
              <FaStar />
            </div>
            <div className="weather-deatils">
              <div className="details">falkfjaklfjajkdfadfamalf</div>
            </div>
          </div>
          <div className="weather-card">
            <div className="city-name">
              <h4>City Name</h4>
              <FaStar />
            </div>
            <div className="weather-deatils">
              <div className="details">falkfjaklfjajkdfadfamalf</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
