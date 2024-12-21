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
      {planet ? <p className="planet-info">Planet: {planet}</p> : <p>Please select a planet.</p>}
      {resources ? (
        <ul className="resources-list">
          <li className="resource-item">
            <span className="resource-label">Food:</span>
            <span className="resource-value">{resources.food}</span>
          </li>
          <li className="resource-item">
            <span className="resource-label">Water:</span>
            <span className="resource-value">{resources.water}</span>
          </li>
          <li className="resource-item">
            <span className="resource-label">Fuel:</span>
            <span className="resource-value">{resources.fuel}</span>
          </li>
        </ul>
      ) : (
        <p>Please allocate resources.</p>
      )}
      <button className="start-button" onClick={handleStartMission}>Start Mission</button>
    </div>
  );
};

export default MissionOverview;