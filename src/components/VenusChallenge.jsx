import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // Updated to useNavigate
import axios from 'axios';
import './VenusChallenge.css';

// Importing sound files (if needed for bundling with Webpack)
import victorySound from './victory.mp3';
import failureSound from './failure.mp3';

const VenusChallenge = () => {
  const location = useLocation();
  const navigate = useNavigate();  // Updated to useNavigate
  const { planet, resources = { fuel: 100, water: 100, food: 100 } } = location.state || {};

  const [remainingResources, setRemainingResources] = useState(resources);
  const [score, setScore] = useState(0);
  const [aliens, setAliens] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    if (!planet) {
      alert('Please start the mission from the main menu.');
    }
  }, [planet]);

  useEffect(() => {
    const alienSpawner = setInterval(() => {
      if (!gameOver) {
        setAliens((prev) => [...prev, generateAlien()]);
      }
    }, 1000); // Aliens spawn every second

    return () => clearInterval(alienSpawner);
  }, [gameOver]);

  useEffect(() => {
    if (remainingResources.fuel <= 0 || remainingResources.water <= 0 || remainingResources.food <= 0) {
      setGameOver(true);
      playSound(failureSound); // Play failure sound
    }
  }, [remainingResources]);

  const generateAlien = () => {
    return {
      id: Date.now(),
      position: {
        left: Math.floor(Math.random() * 100),
        top: Math.floor(Math.random() * 100),
      },
      type: '👾',
    };
  };

  const handleDefend = (alienId) => {
    // Depleting resources after each alien kill
    const fuelDepletion = Math.floor(Math.random() * 2) + 3; // Depleting 3 or 4 fuel
    const waterDepletion = Math.floor(Math.random() * 2) + 3; // Depleting 3 or 4 water
    const foodDepletion = Math.floor(Math.random() * 2) + 3; // Depleting 3 or 4 food
  
    if (
      remainingResources.fuel > fuelDepletion &&
      remainingResources.water > waterDepletion &&
      remainingResources.food > foodDepletion
    ) {
      // Decrease resources after killing an alien
      setRemainingResources((prev) => ({
        fuel: prev.fuel - fuelDepletion,
        water: prev.water - waterDepletion,
        food: prev.food - foodDepletion,
      }));
  
      setAliens((prev) => prev.filter((alien) => alien.id !== alienId));
      setScore((prev) => prev + 1);
  
      if (score + 1 >= 16) { 
        setVictory(true);
        setGameOver(true);
        playSound(victorySound); // Play victory sound
      }
    } else {
      setGameOver(true);
      playSound(failureSound); // Play failure sound if resources run out
    }
  };
  
  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const resetGame = () => {
    setRemainingResources(resources);
    setScore(0);
    setAliens([]);
    setGameOver(false);
    setVictory(false);
  };

  const saveScore = async () => {
    const playerName = localStorage.getItem('playerName');
    try {
      const response = await axios.post('http://localhost:8000/venus/saveScore', {
        playerName,
        score,
        resources: remainingResources,
      });

      if (response.data.success) {
        console.log('Score saved successfully!');
      } else {
        console.error('Error saving score:', response.data.message);
      }
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  useEffect(() => {
    if (gameOver) {
      saveScore(); // Save score when game ends
    }
  }, [gameOver]);

  return (
    <div className="venus-challenge">
      <h1>Venus Invasion Defense</h1>
      <p>Defend your Venusian base from invading aliens!</p>

      <div className="game-stats">
        <p>Planet: {planet || 'Unknown'}</p>
        <p>Remaining Resources:</p>
        <ul>
          <li>Fuel: {remainingResources.fuel}</li>
          <li>Water: {remainingResources.water}</li>
          <li>Food: {remainingResources.food}</li>
        </ul>
        <p>Score: {score}</p>
      </div>

      <div className="game-area">
        {aliens.map((alien) => (
          <div
            key={alien.id}
            className="alien"
            style={{
              left: `${alien.position.left}%`,
              top: `${alien.position.top}%`,
              position: 'absolute',
            }}
            onClick={() => handleDefend(alien.id)}
          >
            {alien.type}
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>{victory ? 'You Win!' : 'Game Over!'}</h2>
          <p>Your final score: {score}</p>
          <button onClick={() => navigate('/')}>Play Again</button> {/* Updated to use navigate */}
        </div>
      )}
    </div>
  );
};

export default VenusChallenge;
