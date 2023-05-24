import React from "react";
import "../CityNames/CityNames.css";
import { RiAddBoxFill } from "react-icons/ri";
import { AiOutlineStar } from "react-icons/ai";

const CityNames = () => {
  return (
    <div className="main-container">
      <div className="cities-container">
        <div className="city-list">
          <div className="city-title">
            <p>Cities</p>
            <span>
              <RiAddBoxFill className="Add-city-btn" />
            </span>
          </div>
          <div className="city-card">
            <div>
              <p>Mumbai</p>
              <small>30 C</small>
            </div>
          </div>
          <div className="city-card">
            <div>
              <p>Mumbai</p>
              <small>30 C</small>
            </div>
          </div>
        </div>
        <div className="city-weather-container">
          <div className="selected-city">
            <p>Pune</p>
            <span>
              <AiOutlineStar className="start-icon" />
            </span>
          </div>
          <div className="weather-content-box">
            <div className="weather-details">
              <p>
                Weather contentaklfalnaklvamdvkladvavknakdvnadv
                ajnflanfasflknnasklnfkalsnfklasfnklanfans
                alsnflanflaslfnksalnfasnkflnas lanflkanfknaslfaslnfl
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityNames;
