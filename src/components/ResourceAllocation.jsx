import React, { useState } from 'react';
import './ResourceAllocation.css';

const ResourceAllocation = ({ onResourceAllocate }) => {
  const [resources, setResources] = useState({ food: 50, water: 50, fuel: 50 });

  const handleChange = (type, value) => {
    const updatedResources = { ...resources, [type]: parseInt(value, 10) };
    setResources(updatedResources);
    console.log('Updated Resources:', updatedResources);  // Debug log
    onResourceAllocate(updatedResources); // Notify parent component
  };

  return (
    <div className="resource-allocation">
      <h2>Allocate Resources</h2>
      <div className="slider-container">
        <label>Food: {resources.food}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={resources.food}
          onChange={(e) => handleChange('food', e.target.value)}
        />
      </div>
      <div className="slider-container">
        <label>Water: {resources.water}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={resources.water}
          onChange={(e) => handleChange('water', e.target.value)}
        />
      </div>
      <div className="slider-container">
        <label>Fuel: {resources.fuel}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={resources.fuel}
          onChange={(e) => handleChange('fuel', e.target.value)}
        />
      </div>
    </div>
  );
};

export default ResourceAllocation;
