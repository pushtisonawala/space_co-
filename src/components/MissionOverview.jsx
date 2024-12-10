import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MissionOverview.css';

const MissionOverview = ({ planet, resources }) => {
  const navigate = useNavigate();

  const handleStartMission = () => {
    console.log('Starting Mission with:', { planet, resources });

    if (planet && resources) {
      navigate('/transition', { state: { planet, resources } });
    } else {
      alert('Please select a planet and allocate resources before starting the mission.');
    }
  };

  return (
    <div className="mission-overview">
      <h2>Mission Overview</h2>
      {planet ? <p>Planet: {planet}</p> : <p>Please select a planet.</p>}
      {resources ? (
        <ul>
          <li>Food: {resources.food}</li>
          <li>Water: {resources.water}</li>
          <li>Fuel: {resources.fuel}</li>
        </ul>
      ) : (
        <p>Please allocate resources.</p>
      )}
      <button onClick={handleStartMission}>Start Mission</button>
    </div>
  );
};

export default MissionOverview;
