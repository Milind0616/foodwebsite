import React, { useState } from 'react';
import { loginUser, initializeUsers } from '../utils/authUtils';
import './Login.css';

function Login({ onLogin, onSignUpClick }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize users on component mount
  React.useEffect(() => {
    initializeUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!username.trim()) {
      setErrors({ username: 'Username is required' });
      return;
    }

    if (!password) {
      setErrors({ password: 'Password is required' });
      return;
    }

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const result = loginUser(username, password);

      if (result.success) {
        setIsAnimating(true);
        setTimeout(() => {
          onLogin(result.user.username, result.user.role);
        }, 800);
      } else {
        setErrors({ form: result.error });
        setIsLoading(false);
      }
    }, 600);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className={`login-card ${isAnimating ? 'login-exit' : ''}`}>
        <div className="logo-section">
          <h1 className="brand-name">Zyka</h1>
          <p className="tagline serif-text">Where Every Bite Tells a Story</p>
        </div>

        {errors.form && (
          <div className="error-message">
            ✗ {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              className={errors.username ? 'input-error' : ''}
              disabled={isLoading}
            />
            {errors.username && <span className="field-error">{errors.username}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={errors.password ? 'input-error' : ''}
              disabled={isLoading}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            <span>{isLoading ? 'Logging in...' : 'Enter Zyka'}</span>
            {!isLoading && (
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </form>

        <div className="signup-link">
          <p>Don't have an account? <button type="button" className="link-btn" onClick={onSignUpClick}>Sign up here</button></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
