import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = function () {
  return (
    <header>
      <h1>The Rick and Morty</h1>
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
