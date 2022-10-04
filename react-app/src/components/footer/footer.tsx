import React from 'react';
import './Footer.css';
import logo from '../../assets/img/logo.png';

export const Footer = function () {
  return (
    <footer>
      <p>React</p>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <p>© 2022</p>
    </footer>
  );
};

export default Footer;
