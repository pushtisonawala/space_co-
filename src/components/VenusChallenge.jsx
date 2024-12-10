import React, { useState } from 'react';
import './VenusChallenge.css';

const VenusChallenge = ({ resources, onComplete }) => {
  const [cooling, setCooling] = useState(0);

  const handleCooling = () => {
    const coolingNeeded = 30;

    if (cooling >= coolingNeeded) {
      alert('Success! Venus challenge completed.');
      onComplete({
        ...resources,
        fuel: resources.fuel - 15, // Use fuel to cool the spacecraft
      });
    } else {
      alert('Challenge failed. Insufficient cooling.');
      onComplete({
        ...resources,
        fuel: resources.fuel - 5, // Minimal fuel consumption on failure
      });
    }
  };

  return (
    <div>
      <h2>Venus Challenge: Cooling Systems</h2>
      <p>Fuel: {resources.fuel}</p>
      <input
        type="number"
        value={cooling}
        onChange={(e) => setCooling(Number(e.target.value))}
        placeholder="Allocate fuel for cooling"
      />
      <button onClick={handleCooling}>Submit</button>
    </div>
  );
};

export default VenusChallenge;
