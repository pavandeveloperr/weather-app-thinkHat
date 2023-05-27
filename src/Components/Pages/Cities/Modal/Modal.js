import React, { useState } from "react";
import { RiAddBoxFill } from "react-icons/ri";

const Modal = ({ onClose, onAddCity }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const cities = [
    "Mumbai",
    "Delhi",
    "Gujarat",
    "Chennai",
    "Bengaluru",
    "Mysore",
    "Hubli",
    "Hyderabad",
    "Goa",
    "Pune",
    "Madurai",
    "Kerala",
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCity = (city) => {
    onAddCity(city);
    onClose();
  };

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
          <ul className="city-names-list">
            {filteredCities.map((city) => (
              <li key={city}>
                {city}
                <span>
                  <RiAddBoxFill
                    className="Add-city-btn"
                    onClick={() => handleAddCity(city)}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
