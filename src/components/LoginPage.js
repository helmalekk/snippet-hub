import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Here you would typically make an API call to validate credentials
      // For now, we'll just simulate a successful login
      if (username && password) {
        login(username);
        navigate('/');
      } else {
        setError('Please enter both username and password');
      }
    } catch (err) {
      setError('Failed to log in. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <div className="login-form">
        <h1 className="page-title">Login</h1>
        
        {error && (
          <div className="error-container">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="text-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="text-input"
            />
          </div>

          <button type="submit" className="submit-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage; 