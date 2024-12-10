import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Start from './pages/Start';
import About from './pages/About';
import Leaderboard from './pages/Leaderboard';
import Help from './pages/Help';
import Login from './pages/LoginSignup';
import TransitionScene from './pages/Transition';
import Mission from './pages/Mission';
import MarsChallenge from './components/MarsChallenge';
import VenusChallenge from './components/VenusChallenge';
import JupiterChallenge from './components/JupiterChallenge';

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const App = () => {
  const location = useLocation();

  // Manage planet and resources
  const [planet, setPlanet] = useState('Jupiter'); // Set default planet to 'Jupiter'
  const [initialResources, setInitialResources] = useState({ fuel: 100, food: 100, water: 100 });

  // Function to handle planet change (useful for dynamic planet selection)
  const handlePlanetChange = (newPlanet) => {
    setPlanet(newPlanet);
  };

  return (
    <div>
      <Routes>
        {/* Home and Start */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/start" element={<Start />} />

        {/* Pages with Navbar and Footer */}
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Layout>
              <Leaderboard />
            </Layout>
          }
        />
        <Route
          path="/help"
          element={
            <Layout>
              <Help />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        {/* Transition and Mission Pages */}
        <Route path="/transition" element={<TransitionScene />} />
        <Route
          path="/mission"
          element={<Mission planet={planet} initialResources={initialResources} />}
        />

        {/* Challenge Pages for Mars, Venus, and Jupiter */}
        <Route path="/MarsChallenge" element={<MarsChallenge />} />
        <Route path="/VenusChallenge" element={<VenusChallenge />} />
        <Route path="/JupiterChallenge" element={<JupiterChallenge />} />
      </Routes>

      {/* Footer is conditionally rendered for all routes except '/transition' */}
      {location.pathname !== '/transition' && <Footer />}
    </div>
  );
};

export default App;
