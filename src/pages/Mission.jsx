import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import JupiterChallenge from '../components/JupiterChallenge'; // Ensure you import the component

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
      <div>
        <h2>Mission Setup Incomplete</h2>
        <p>Please go back and select a planet.</p>
      </div>
    );
  }

  const handleStartChallenge = () => {
    setIsChallengeActive(true);
  };

  // This function will be passed to child components to update resources
  const handleResourcesUpdate = (updatedResources) => {
    setResources(updatedResources);
  };

  return (
    <div>
      <h1>Mission Overview</h1>
      <p><strong>Planet:</strong> {planet}</p>
      <h3>Resources:</h3>
      <ul>
        <li><strong>Food:</strong> {resources.food}</li>
        <li><strong>Water:</strong> {resources.water}</li>
        <li><strong>Fuel:</strong> {resources.fuel}</li>
      </ul>
      {!isChallengeActive ? (
        <button onClick={handleStartChallenge}>Start Challenge</button>
      ) : (
        <JupiterChallenge resources={resources} onComplete={handleResourcesUpdate} />
      )}
    </div>
  );
};

export default Mission;