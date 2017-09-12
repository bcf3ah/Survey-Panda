import React from 'react';
import pandaPic from '../assets/survey-panda.png';
import '../assets/panda-animate.css';

const Landing = () => {
  return (
    <div className="center-align">
      <h1>Survey Panda</h1>
      <h4>Find out why your app sucks</h4>
      <figure>
        <img id="panda-landing" src={pandaPic} alt="Panda Landing" style={{width: '40vmin', marginTop: 30}}/>
      </figure>
    </div>
  );
}

export default Landing;
