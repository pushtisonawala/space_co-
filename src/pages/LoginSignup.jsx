import React, { useState } from 'react';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginSignup = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleToggle = () => setIsSignup(!isSignup);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isSignup) {
                // Signup logic
                if (formData.password !== formData.confirmPassword) {
                    alert('Passwords do not match!');
                    return;
                }

                const response = await axios.post('http://localhost:8000/auth/signup', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

                if (response.data.success) {
                    alert('Account created successfully! Please login.');
                    setIsSignup(false);
                } else {
                    alert(response.data.message || 'Error during signup');
                }
            } else {
                // Login logic
                const response = await axios.post('http://localhost:8000/auth/login', {
                    email: formData.email,
                    password: formData.password,
                });

                if (response.data.success) {
                    alert('Login Successful!');
                    localStorage.setItem('authToken', response.data.token);                    localStorage.setItem('playerName', response.data.name); // Store player name
                    navigate('/'); // Redirect to the home page
                } else {
                    alert('🚀Houston, we have a problem! Invalid credentials.');
                }
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again later.');
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