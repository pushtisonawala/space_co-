import React from 'react';
import { useNavigate } from 'react-router-dom';

const MissionSetup = ({ selectedPlanet, resources }) => {
  const navigate = useNavigate();

  const startMission = () => {
    if (selectedPlanet && resources) {
      navigate('/mission', { state: { selectedPlanet, resources } });
    } else {
      alert('Please select a planet and allocate resources.');
    }
  };

  return (
    <div>
      <h1>Mission to {selectedPlanet}</h1>
      <h3>Resources Allocated:</h3>
      <p>Food: {resources.food}</p>
      <p>Fuel: {resources.fuel}</p>
      <p>Water: {resources.water}</p>
      <button onClick={startMission}>Start Mission</button>
    </div>
  );
};

export default MissionSetup;
