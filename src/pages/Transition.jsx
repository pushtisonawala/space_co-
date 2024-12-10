import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Transition.css';

const Transition = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const missionData = location.state;

  useEffect(() => {
    if (!missionData) {
      navigate('/start'); // Redirect back if no data is available
      return;
    }

    const timer = setTimeout(() => {
      navigate('/mission', { state: missionData });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, missionData]);

  return (
    <div className="transition-page">
      <h2>Preparing Your Mission...</h2>
      <div className="loader"></div>
    </div>
  );
};

export default Transition;
