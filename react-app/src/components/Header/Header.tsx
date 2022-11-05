import React from "react";
import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";

const Header = function () {
  const location = useLocation();

  return (
    <header>
      <h1>The Rick and Morty</h1>
      <div>Position: {location.pathname}</div>
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/form">Form</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
