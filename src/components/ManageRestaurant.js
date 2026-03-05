import React, { useState } from 'react';
import './ManageRestaurant.css';

function ManageRestaurant({ restaurant, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: restaurant.name,
    cuisine: restaurant.cuisine,
    type: restaurant.type || 'mixed',
    description: restaurant.description,
    deliveryTime: restaurant.deliveryTime,
    image: restaurant.image,
    rating: restaurant.rating || 0
  });
  const [imagePreview, setImagePreview] = useState(restaurant.image || '');


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




  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      type: restaurant.type || 'mixed',
      description: restaurant.description,
      deliveryTime: restaurant.deliveryTime,
      image: restaurant.image,
      rating: restaurant.rating || 0
    });
    setImagePreview(restaurant.image || '');
    setIsEditing(false);
  };

  return (
    <div className="restaurant-details">
      <div className="section-header">
        <h2>Restaurant Details</h2>
        {!isEditing && (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            ✏️ Edit
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="details-view">
          <div className="detail-card">
            <div className="card-header">
              <img src={restaurant.image} alt={restaurant.name} />
            </div>
            <div className="card-body">
              <h3>{restaurant.name}</h3>
              <p className="meta-info">
                <span className="badge cuisine-badge">{restaurant.cuisine}</span>
                <span className="badge type-badge">{restaurant.type}</span>
              </p>
              <div className="detail-row">
                <span className="label">Description:</span>
                <span className="value">{restaurant.description}</span>
              </div>
              <div className="detail-row">
                <span className="label">Delivery Time:</span>
                <span className="value">{restaurant.deliveryTime}</span>
              </div>
              <div className="detail-row">
                <span className="label">Rating:</span>
                <span className="value">⭐ {restaurant.rating || 'Not rated'}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="edit-form">
          <div className="form-group">
            <label htmlFor="name">Restaurant Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cuisine">Cuisine Type</label>
            <input
              type="text"
              id="cuisine"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Restaurant Type</label>
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

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
            />
          </div>



          <div className="form-actions">
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageRestaurant;
