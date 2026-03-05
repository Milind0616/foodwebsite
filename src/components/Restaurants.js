import React, { useState } from 'react';
// ...existing code...
import './Restaurants.css';

function Restaurants({ restaurants, onSelectRestaurant, username, onLogout }) {
  const [filterType, setFilterType] = useState('all');

  const filteredRestaurants = filterType === 'all' 
    ? restaurants 
    : restaurants.filter(restaurant => restaurant.type === filterType);

  return (
    <div className="restaurants-container">
      <header className="restaurants-header">
        <div className="header-content">
          <div className="header-top">
            <h1 className="page-title">ZYKA</h1>
            <div className="user-info">
              <span className="welcome-text">Welcome, {username}</span>
              <div className="user-avatar">{username[0].toUpperCase()}</div>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
          <p className="page-subtitle serif-text">Discover extraordinary flavors from exceptional restaurants</p>
        </div>
      </header>

      <div className="filter-section">
        <h2 className="filter-title">Filter by Type</h2>
        <div className="filter-buttons">
          <label className={`filter-option ${filterType === 'all' ? 'active' : ''}`}>
            <input
              type="radio"
              name="filter"
              value="all"
              checked={filterType === 'all'}
              onChange={(e) => setFilterType(e.target.value)}
            />
            <span className="filter-label">
              <span>All Restaurants</span>
              <span className="filter-count">{restaurants.length}</span>
            </span>
          </label>

          <label className={`filter-option veg-option ${filterType === 'veg' ? 'active' : ''}`}>
            <input
              type="radio"
              name="filter"
              value="veg"
              checked={filterType === 'veg'}
              onChange={(e) => setFilterType(e.target.value)}
            />
            <span className="filter-label">
              <span>Vegetarian</span>
              <span className="filter-count">{restaurants.filter(r => r.type === 'veg').length}</span>
            </span>
          </label>

          <label className={`filter-option non-veg-option ${filterType === 'non-veg' ? 'active' : ''}`}>
            <input
              type="radio"
              name="filter"
              value="non-veg"
              checked={filterType === 'non-veg'}
              onChange={(e) => setFilterType(e.target.value)}
            />
            <span className="filter-label">
              <span>Non-Vegetarian</span>
              <span className="filter-count">{restaurants.filter(r => r.type === 'non-veg').length}</span>
            </span>
          </label>
        </div>
      </div>

      <div className="restaurants-grid">
        {filteredRestaurants.map((restaurant, index) => (
          <div
            key={restaurant.id}
            className="restaurant-card"
            onClick={() => onSelectRestaurant(restaurant)}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="restaurant-image-container">
              <img 
                src={restaurant.image} 
                alt={restaurant.name}
                className="restaurant-image"
              />
              <div className={`restaurant-type-badge ${restaurant.type}`}>
                {restaurant.type === 'veg' ? 'Pure Veg' : 'Non-Veg'}
              </div>
              <div className="restaurant-overlay">
                <button className="view-menu-btn">
                  <span>View Menu</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="restaurant-info">
              <h3 className="restaurant-name">{restaurant.name}</h3>
              <p className="restaurant-cuisine serif-text">{restaurant.cuisine}</p>
              <p className="restaurant-description">{restaurant.description}</p>
              
              <div className="restaurant-meta">
                <div className="meta-item">
                  <span className="rating">{restaurant.rating}</span>
                </div>
                <div className="meta-item">
                  <span className="delivery-time">{restaurant.deliveryTime}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="no-results">
          <h3>No restaurants found</h3>
          <p>Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}

export default Restaurants;
