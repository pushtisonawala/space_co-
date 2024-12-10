import React, { useState } from 'react';
import './MarsChallenge.css';

const MarsChallenge = ({ resources, onComplete }) => {
  const [oxygen, setOxygen] = useState(0);

  const handleAnswer = () => {
    const oxygenRequired = 50;

    if (oxygen >= oxygenRequired) {
      alert('Success! Mars challenge completed.');
      onComplete({
        ...resources,
        fuel: resources.fuel - 20, // Consume resources on success
      });
    } else {
      alert('Challenge failed. Try again!');
      onComplete({
        ...resources,
        fuel: resources.fuel - 10, // Consume fewer resources on failure
      });
    }
  };

  return (
    <div>
      <h2>Mars Challenge: Oxygen Allocation</h2>
      <p>Fuel: {resources.fuel}</p>
      <input
        type="number"
        value={oxygen}
        onChange={(e) => setOxygen(Number(e.target.value))}
        placeholder="Enter oxygen level"
      />
      <button onClick={handleAnswer}>Submit</button>
    </div>
  );
};

export default MarsChallenge;
