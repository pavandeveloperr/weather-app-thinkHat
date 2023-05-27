import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import "../Home/Home.css";
import CityWeather from "./CityWeather/CityWeather";

const Cities = () => {
  const location = useLocation();
  return (
    <div className="parent-container">
      <div className="container">
        <div className="side-menu">
          <div className="side-menu__item">
            <NavLink
              exact
              to="/"
              className={`side-menu__link ${
                location.pathname === "/" ? "active-link" : ""
              }`}
            >
              <BsFillHouseFill className="side-menu__icon" /> Home
            </NavLink>
          </div>
          <div className="side-menu__item">
            <NavLink
              to="/cities"
              className={`side-menu__link ${
                location.pathname === "/cities" ? "active-link" : ""
              }`}
              activeClassName="active-link"
            >
              <FaCity className="side-menu__icon" /> Cities
            </NavLink>
          </div>
        </div>

        {/* City Names Component goes here */}
        <CityWeather />
      </div>
    </div>
  );
};

export default Cities;
