import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import JupiterChallenge from '../components/JupiterChallenge';
import MarsChallenge from '../components/MarsChallenge';
import VenusChallenge from '../components/VenusChallenge';
import './Mission.css';

const Mission = () => {
  const location = useLocation();
  const { planet, resources: initialResources } = location.state || {};

  const [resources, setResources] = useState(initialResources || { fuel: 0, food: 0, water: 0 });
  const [isChallengeActive, setIsChallengeActive] = useState(false);

  useEffect(() => {
    console.log('Location state:', location.state);
  }, [location.state]);

  if (!planet) {
    return (
      <div className="mission-container">
        <h2>Mission Setup Incomplete</h2>
        <p>Please go back and select a planet.</p>
      </div>
    );
  }

  const handleStartChallenge = () => {
    setIsChallengeActive(true);
  };

  const handleResourcesUpdate = (updatedResources) => {
    setResources(updatedResources);
  };

  const getChallengeComponent = () => {
    switch (planet) {
      case 'jupiter':
        return <JupiterChallenge resources={resources} onComplete={handleResourcesUpdate} />;
      case 'venus':
        return <VenusChallenge resources={resources} onComplete={handleResourcesUpdate} />;
      case 'mars':
        return <MarsChallenge resources={resources} onComplete={handleResourcesUpdate} />;
      default:
        return (
          <div>
            <h2>Invalid Planet Selected</h2>
            <p>Please go back and select a valid planet.</p>
          </div>
        );
    }
  };

  return (
    <div className="mission-container">
      <div className="header">
        <h1>Mission Overview</h1>
        <p><strong>Planet:</strong> {planet}</p>
      </div>

      <div className="resources">
        <h3>Resources:</h3>
        <ul>
          <li><strong>Food:</strong> {resources.food}</li>
          <li><strong>Water:</strong> {resources.water}</li>
          <li><strong>Fuel:</strong> {resources.fuel}</li>
        </ul>
      </div>

      {!isChallengeActive ? (
        <div className="button-container">
          <button onClick={handleStartChallenge} className="start-btn">
            Initiate Alien Conquest: {planet} Awaits!
          </button>
        </div>
      ) : (
        getChallengeComponent()
      )}

      {/* Rocket Animation */}
      <div className="rocket-container">
        <div className="rocket"></div>
      </div>
    </div>
  );
};

export default Mission;
