import React, { useState } from "react";
import "../CityNames/CityNames.css";
import { RiAddBoxFill } from "react-icons/ri";
import { AiOutlineStar } from "react-icons/ai";

const Modal = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const cities = [
    "Mumbai",
    "Delhi",
    "Gujarat",
    "Chennai",
    "Bengaluru",
    "Mysore",
    "Hubli",
    "Darwad",
    "Raichur",
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <p>Cities</p>
          <div className="modal-footer">
            <button onClick={onClose}>Close</button>
          </div>
        </div>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Search city"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <ul className="city-list">
            {filteredCities.map((city) => (
              <>
                <li key={city}>
                  {city}
                  <span>
                    <RiAddBoxFill className="Add-city-btn" />
                  </span>
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CityNames = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCityClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </div>
  );
};

export default CityNames;
