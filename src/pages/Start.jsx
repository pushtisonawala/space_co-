import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Start.css';

import PlanetSelection from '../components/PlanetSelection';
import ResourceAllocation from '../components/ResourceAllocation';
import MissionOverview from '../components/MissionOverview';

const Start = () => {
  const [planet, setPlanet] = useState(null);
  const [resources, setResources] = useState({});
  const navigate = useNavigate();

  const handlePlanetSelection = (selectedPlanet) => {
    setPlanet(selectedPlanet);
  };

  const handleResourceAllocation = (allocatedResources) => {
    setResources(allocatedResources);
  };

  const startMission = () => {
    if (planet && Object.keys(resources).length > 0) {
      navigate('/transition', { state: { planet, resources } });
    } else {
      alert('Please select a planet and allocate resources first!');
    }
  };

  return (
    <div className="start-page">
      <div className="navbar">
        <div className="logo">Mission App</div>
        <ul className="navbar-links">
          <li><a href="#mission-overview">Mission Overview</a></li>
          <li><a href="#resource-allocation">Resource Allocation</a></li>
          <li><a href="#planet-selection">Planet Selection</a></li>
        </ul>
      </div>

      <div className="content-container">
        <section id="mission-overview">
          <MissionOverview planet={planet} resources={resources} />
        </section>

        <section id="planet-selection">
          <PlanetSelection onPlanetSelect={handlePlanetSelection} />
        </section>

        <section id="resource-allocation">
          <ResourceAllocation onResourceAllocate={handleResourceAllocation} />
        </section>

        <button className="start-button" onClick={startMission}>
          Start Mission
        </button>
      </div>
    </div>
  );
};

export default Start;
