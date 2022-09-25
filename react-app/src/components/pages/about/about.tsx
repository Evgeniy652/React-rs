import React from 'react';
import './about.css';

const About = function () {
  return (
    <div className="about">
      <h2>About</h2>
      <p>
        The Rick and Morty API is a REST(ish) and GraphQL API based on the television show Rick and
        Morty. You will have access to about hundreds of characters, images, locations and episodes.
        The Rick and Morty API is filled with canonical information as seen on the TV show. Because
        we were really interested in the idea of writing an open source project and also because
        Rick and Morty is our favorite show at that moment, so why not?
      </p>
    </div>
  );
};

export default About;
