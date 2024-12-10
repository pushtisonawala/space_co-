import React, { useState } from 'react';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // Add confirm password field for signup
  });

  const navigate = useNavigate(); // For redirection

  // Simulated list of registered users
  const [registeredUsers, setRegisteredUsers] = useState([
    { email: 'test@example.com', password: '12345' },
    { email: 'user@example.com', password: 'password' },
  ]);

  const handleToggle = () => setIsSignup(!isSignup);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // Check if the email is already registered
      const userExists = registeredUsers.some(
        (user) => user.email === formData.email
      );

      if (userExists) {
        alert('User already exists. Please login instead.');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      // Add new user to the list
      setRegisteredUsers((prevUsers) => [
        ...prevUsers,
        { email: formData.email, password: formData.password },
      ]);
      alert('Account created successfully! Please login.');
      setIsSignup(false); // Switch to login view
    } else {
      // Login validation
      const user = registeredUsers.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (user) {
        alert('Login Successful!');
        navigate('/'); 
      } else {
        alert('🚀Houston, we have a problem! This account doesn’t exist in our galaxy. Please sign up to join the crew.');


      }
    }
  };

  return (
    <div className="login-signup-page">
      <form onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

        {isSignup && (
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {isSignup && (
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <button type="submit" className="submit-button">
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <p onClick={handleToggle} className="toggle-link">
          {isSignup
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
};

export default LoginSignup;
