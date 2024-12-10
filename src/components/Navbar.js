import React, { useState } from 'react';
import './Navbar.css';
import logo from './logo.png'; // Import your logo image
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
      <div className="logo">
        <img src={logo} alt="Space-Col Logo" /> 
      </div>

      <div className="menu-toggle" onClick={handleToggleMenu}>
        &#9776; {/* Hamburger icon */}
      </div>

      <ul className={menuOpen ? 'open' : ''}>
        <li>
          <Link to="/start">Start new Mission</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <button className="logout-button" onClick={onLogout}>Logout</button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login/Signup</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
