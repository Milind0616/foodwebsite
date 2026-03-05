
import React, { useState, useEffect } from 'react';
import './RestaurantOwnerDashboard.css';
import ManageRestaurant from './ManageRestaurant';
import ManageMenu from './ManageMenu';

function RestaurantOwnerDashboard({ restaurants, setRestaurants, username, onLogout }) {
    // Handler to delete the restaurant
    const handleDeleteRestaurant = () => {
      if (!ownedRestaurant) return;
      setRestaurants(prev => prev.filter(r => r.id !== ownedRestaurant.id));
      localStorage.removeItem(`restaurant_${username}`);
      setOwnedRestaurant(null);
      setActiveTab('overview');
    };
  const [activeTab, setActiveTab] = useState('overview');
  const [ownedRestaurant, setOwnedRestaurant] = useState(null);
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);

  // Load owner's restaurant from localStorage
  useEffect(() => {
    const storedRestaurant = localStorage.getItem(`restaurant_${username}`);
    if (storedRestaurant) {
      setOwnedRestaurant(JSON.parse(storedRestaurant));
    }
  }, [username]);

  const handleCreateRestaurant = (restaurantData) => {
    const newRestaurant = {
      id: Date.now(),
      owner: username,
      ...restaurantData,
      menu: {}
    };
    setOwnedRestaurant(newRestaurant);
    localStorage.setItem(`restaurant_${username}`, JSON.stringify(newRestaurant));
    // Add to global restaurants list
    setRestaurants(prev => [...prev, newRestaurant]);
    setShowAddRestaurant(false);
  };

  const handleUpdateRestaurant = (updatedData) => {
    const updated = { ...ownedRestaurant, ...updatedData };
    setOwnedRestaurant(updated);
    localStorage.setItem(`restaurant_${username}`, JSON.stringify(updated));
    // Merge updated restaurant into global restaurants list
    setRestaurants(prev => {
      const exists = prev.some(r => r.id === updated.id);
      if (exists) {
        return prev.map(r => r.id === updated.id ? updated : r);
      } else {
        return [...prev, updated];
      }
    });
  };

  const handleAddDish = (category, dish) => {
    const updated = {
      ...ownedRestaurant,
      menu: {
        ...ownedRestaurant.menu,
        [category]: [...(ownedRestaurant.menu[category] || []), dish]
      }
    };
    setOwnedRestaurant(updated);
    localStorage.setItem(`restaurant_${username}`, JSON.stringify(updated));
  };

  const handleUpdateDish = (category, dishId, updatedDish) => {
    const updated = {
      ...ownedRestaurant,
      menu: {
        ...ownedRestaurant.menu,
        [category]: ownedRestaurant.menu[category].map(dish =>
          dish.id === dishId ? { ...dish, ...updatedDish } : dish
        )
      }
    };
    setOwnedRestaurant(updated);
    localStorage.setItem(`restaurant_${username}`, JSON.stringify(updated));
  };

  const handleDeleteDish = (category, dishId) => {
    const updated = {
      ...ownedRestaurant,
      menu: {
        ...ownedRestaurant.menu,
        [category]: ownedRestaurant.menu[category].filter(dish => dish.id !== dishId)
      }
    };
    setOwnedRestaurant(updated);
    localStorage.setItem(`restaurant_${username}`, JSON.stringify(updated));
  };

  return (
    <div className="owner-dashboard">
      <header className="owner-header">
        <div className="header-content">
          <div className="header-top">
            <h1 className="page-title">🍽️ Restaurant Owner Dashboard</h1>
            <div className="user-info">
              <span className="welcome-text">Welcome, {username}</span>
              <div className="user-avatar">{username[0].toUpperCase()}</div>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
          <p className="page-subtitle">Manage your restaurant and menu</p>
        </div>
      </header>

      <div className="dashboard-container">
        {!ownedRestaurant ? (
          <div className="no-restaurant">
            <div className="no-restaurant-content">
              <h2>No Restaurant Yet</h2>
              <p>Create your restaurant to get started!</p>
              <button 
                className="create-btn"
                onClick={() => setShowAddRestaurant(true)}
              >
                Create Restaurant
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
              <button className="delete-btn" style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }} onClick={handleDeleteRestaurant}>
                🗑️ Delete Restaurant
              </button>
            </div>
            <nav className="dashboard-tabs">
              <button 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                📊 Overview
              </button>
              <button 
                className={`tab-btn ${activeTab === 'restaurant' ? 'active' : ''}`}
                onClick={() => setActiveTab('restaurant')}
              >
                🏪 Restaurant Details
              </button>
              <button 
                className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
                onClick={() => setActiveTab('menu')}
              >
                📋 Manage Menu
              </button>
            </nav>

            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-section">
                  <h2>Restaurant Overview</h2>
                  <RestaurantOverviewCard restaurant={ownedRestaurant} />
                </div>
              )}

              {activeTab === 'restaurant' && (
                <ManageRestaurant 
                  restaurant={ownedRestaurant}
                  onUpdate={handleUpdateRestaurant}
                />
              )}

              {activeTab === 'menu' && (
                <ManageMenu 
                  restaurant={ownedRestaurant}
                  onAddDish={handleAddDish}
                  onUpdateDish={handleUpdateDish}
                  onDeleteDish={handleDeleteDish}
                />
              )}
            </div>
          </>
        )}

        {showAddRestaurant && (
          <div className="modal-overlay" onClick={() => setShowAddRestaurant(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Create Your Restaurant</h2>
              <CreateRestaurantForm 
                onSubmit={handleCreateRestaurant}
                onCancel={() => setShowAddRestaurant(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CreateRestaurantForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    type: 'veg',
    description: '',
    deliveryTime: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Restaurant Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter restaurant name"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cuisine">Cuisine Type *</label>
          <input
            type="text"
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            placeholder="e.g., North Indian, Italian"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Restaurant Type *</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your restaurant"
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="deliveryTime">Delivery Time</label>
          <input
            type="text"
            id="deliveryTime"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleChange}
            placeholder="e.g., 30-45 min"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          {imagePreview && (
            <div style={{ marginTop: '10px' }}>
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '120px', maxHeight: '120px', borderRadius: '8px' }} />
            </div>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Create Restaurant
        </button>
      </div>
    </form>
  );
}

function RestaurantOverviewCard({ restaurant }) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoaded(true);
    setImageError(true);
  };

  return (
    <div className="restaurant-card">
      <div className="card-header">
        {restaurant.image ? (
          <>
            <img
              src={restaurant.image}
              alt={restaurant.name}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ opacity: imageError ? 0.3 : 1 }}
            />
            {imageError && (
              <div className="image-error-overlay">
                <span>Unable to load image</span>
              </div>
            )}
          </>
        ) : (
          <div className="no-image-placeholder">
            <span>📸 No Image</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <h3>{restaurant.name}</h3>
        <p className="cuisine">{restaurant.cuisine}</p>
        <p className="description">{restaurant.description}</p>
        <div className="stats">
          <div className="stat">
            <span className="stat-label">Type</span>
            <span className="stat-value">{restaurant.type || 'Mixed'}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Dishes</span>
            <span className="stat-value">
              {Object.values(restaurant.menu || {}).reduce((sum, arr) => sum + arr.length, 0)}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Owner</span>
            <span className="stat-value">{restaurant.owner}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantOwnerDashboard;
