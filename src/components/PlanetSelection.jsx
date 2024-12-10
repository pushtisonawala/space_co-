import React, { useState } from 'react';
import mars from './mars.jpg';
import jupiter from './jupiter.jpg';
import venus from './venus.jpg';
import './PlanetSelection.css';

const PlanetSelection = ({ onPlanetSelect }) => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const handlePlanetClick = (planetName) => {
    console.log('Planet clicked:', planetName);  // Debug log
    setSelectedPlanet(planetName);
    onPlanetSelect(planetName); // Update global state in Start.jsx
  };

  return (
    <div className="planet-selection-box">
      <h2>Select a Planet</h2>
      <div className="planet-selection">
        <div className="planet-item" onClick={() => handlePlanetClick('mars')}>
          <img src={mars} alt="Mars" />
          <p className={selectedPlanet === 'mars' ? 'selected' : ''}>Mars</p>
        </div>
        <div className="planet-item" onClick={() => handlePlanetClick('jupiter')}>
          <img src={jupiter} alt="Jupiter" />
          <p className={selectedPlanet === 'jupiter' ? 'selected' : ''}>Jupiter</p>
        </div>
        <div className="planet-item" onClick={() => handlePlanetClick('venus')}>
          <img src={venus} alt="Venus" />
          <p className={selectedPlanet === 'venus' ? 'selected' : ''}>Venus</p>
        </div>
      </div>
      <p>{selectedPlanet ? `You selected: ${selectedPlanet}` : "Please select a planet."}</p>
    </div>
  );
};

export default PlanetSelection;
