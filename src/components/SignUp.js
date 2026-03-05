import React, { useState } from 'react';
import { registerUser, isValidEmail, isValidPassword, isValidUsername } from '../utils/authUtils';
import './SignUp.css';

function SignUp({ onSignUpSuccess, onBackToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!isValidUsername(formData.username)) {
      newErrors.username = 'Username must be 3-20 characters (alphanumeric and underscore only)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const result = registerUser(
        formData.username,
        formData.email,
        formData.password,
        formData.role
      );

      if (result.success) {
        setSuccessMessage('Account created successfully! Redirecting to login...');
        // Clear form
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'customer'
        });
        // Redirect to login after 1.5 seconds
        setTimeout(() => {
          onSignUpSuccess(result.user);
        }, 1500);
      } else {
        setErrors({ form: result.error });
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="signup-container">
      <div className="signup-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="signup-card">
        <div className="logo-section">
          <h1 className="brand-name">Zyka</h1>
          <p className="tagline serif-text">Create Your Account</p>
        </div>

        {successMessage && (
          <div className="success-message">
            ✓ {successMessage}
          </div>
        )}

        {errors.form && (
          <div className="error-message">
            ✗ {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="role-selection">
            <label className={`role-option ${formData.role === 'customer' ? 'active' : ''}`}>
              <input
                type="radio"
                name="role"
                value="customer"
                checked={formData.role === 'customer'}
                onChange={handleChange}
              />
              <span className="role-label">🛒 Customer</span>
            </label>
            <label className={`role-option ${formData.role === 'restaurant_owner' ? 'active' : ''}`}>
              <input
                type="radio"
                name="role"
                value="restaurant_owner"
                checked={formData.role === 'restaurant_owner'}
                onChange={handleChange}
              />
              <span className="role-label">🍽️ Restaurant Owner</span>
            </label>
          </div>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <span className="field-error">{errors.username}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password (min 6 characters)"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="signup-button" disabled={isLoading}>
            <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
            {!isLoading && (
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </form>

        <div className="login-link">
          <p>Already have an account? <button className="link-btn" onClick={onBackToLogin}>Login here</button></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
