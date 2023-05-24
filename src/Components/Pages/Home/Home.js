import React from "react";
import { NavLink } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import "../Home/Home.css";
import Favorites from "../Home/Favorites/Favorites";

const Home = () => {
  return (
    <div className="parent-container">
      <div className="container">
        <div className="side-menu">
          <div className="side-menu__item">
            <NavLink
              exact
              to="/"
              className="side-menu__link"
              activeClassName="active-link"
            >
              <BsFillHouseFill className="side-menu__icon" /> Home
            </NavLink>
          </div>
          <div className="side-menu__item">
            <NavLink
              to="/cities"
              className="side-menu__link"
              activeClassName="active-link"
            >
              <FaCity className="side-menu__icon" /> Cities
            </NavLink>
          </div>
        </div>
        {/* Favorites component goes here */}
        <Favorites />
      </div>
    </div>
  );
};

export default Home;
