import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = function () {
  return (
    <header>
      <h1>The Rick and Morty</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
