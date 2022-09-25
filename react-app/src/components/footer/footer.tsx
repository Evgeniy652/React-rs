import React from 'react';
import './footer.css';
import logo from '../img/logo.png';

const Footer = function () {
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
