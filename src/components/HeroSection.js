import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './HeroSection.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


// Custom hook to animate stars
const FloatingStars = ({ starsRef }) => {
  useFrame(() => {
    starsRef.current.rotation.x += 0.001;
    starsRef.current.rotation.y += 0.001;
  });
  return null;
};

const HeroSection = () => {
  const starsRef = useRef();

  return (
    <header className="hero-section">
      {/* 3D Canvas */}
      <div className="hero-container">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 75 }}
          onCreated={(state) => state.gl.setClearColor('black')}
        >
          {/* Add floating stars */}
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

          {/* Add animation to the stars */}
          <FloatingStars starsRef={starsRef} />

          {/* Orbit controls for interactivity */}
          <OrbitControls enableZoom={false} enableRotate={true} enablePan={false} />
        </Canvas>
      </div>

      {/* Content Section */}
      <div className="hero-content">
        <h1>Explore the Cosmos</h1>
        <p>Unlock the mysteries of the universe, one star at a time.</p>
        <Link to="/start" className="cta-button">Begin Your Journey</Link>

      </div>
    </header>
  );
};

export default HeroSection;
