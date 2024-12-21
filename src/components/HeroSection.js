import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HeroSection.css';

const FloatingStars = ({ starsRef }) => {
  useFrame(() => {
    starsRef.current.rotation.x += 0.001;
    starsRef.current.rotation.y += 0.001;
  });
  return null;
};

const HeroSection = ({ isLoggedIn }) => {
  const starsRef = useRef();
  const navigate = useNavigate();

  const handleStartJourney = () => {
    if (isLoggedIn) {
      navigate('/start');
    } else {
      toast.error('Please log in to start a new mission!');
    }
  };

  return (
    <header className="hero-section">
      {/* Toast Container */}
      <ToastContainer />

      {/* 3D Canvas */}
      <div className="hero-container">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 75 }}
          onCreated={(state) => state.gl.setClearColor('black')}
        >
          <group ref={starsRef}>
            {[...Array(100)].map((_, index) => (
              <mesh
                key={index}
                position={[
                  Math.random() * 10 - 5,
                  Math.random() * 10 - 5,
                  Math.random() * 10 - 5,
                ]}
              >
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="white" />
              </mesh>
            ))}
          </group>
          <FloatingStars starsRef={starsRef} />
          <OrbitControls enableZoom={false} enableRotate={true} enablePan={false} />
        </Canvas>
      </div>

      {/* Content Section */}
      <div className="hero-content">
        <h1>Explore the Cosmos</h1>
        <p>Unlock the mysteries of the universe, one star at a time.</p>
        <button onClick={handleStartJourney} className="cta-button">
          Begin Your Journey
        </button>
      </div>
    </header>
  );
};

export default HeroSection;
