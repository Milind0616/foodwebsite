import React, { useState } from 'react';
import './ManageMenu.css';

function ManageMenu({ restaurant, onAddDish, onUpdateDish, onDeleteDish }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('appetizers');
  const [editingDishId, setEditingDishId] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const categories = ['appetizers', 'mainCourse', 'breads', 'desserts', 'beverages'];
  const categoryLabels = {
    appetizers: '🥘 Appetizers',
    mainCourse: '🍜 Main Course',
    breads: '🫓 Breads',
    desserts: '🍰 Desserts',
    beverages: '🥤 Beverages'
  };

  const handleDeleteDish = (dishId) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      onDeleteDish(selectedCategory, dishId);
    }
  };

  const getTotalDishes = () => {
    return Object.values(restaurant.menu || {}).reduce((sum, arr) => sum + arr.length, 0);
  };

  return (
    <div className="manage-menu">
      <div className="section-header">
        <div>
          <h2>Manage Menu</h2>
          <p className="menu-stats">Total Dishes: {getTotalDishes()}</p>
        </div>
        <button 
          className="add-dish-btn"
          onClick={() => setShowAddForm(true)}
        >
          ➕ Add Dish
        </button>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {categoryLabels[cat]}
            <span className="dish-count">
              ({(restaurant.menu?.[cat] || []).length})
            </span>
          </button>
        ))}
      </div>

      {/* Dishes List */}
      <div className="dishes-list">
        {(!restaurant.menu?.[selectedCategory] || restaurant.menu[selectedCategory].length === 0) ? (
          <div className="no-dishes">
            <p>No dishes in this category yet</p>
            <button 
              className="add-first-dish-btn"
              onClick={() => setShowAddForm(true)}
            >
              Add First Dish
            </button>
          </div>
        ) : (
          restaurant.menu[selectedCategory].map(dish => (
            <DishCard
              key={dish.id}
              dish={dish}
              category={selectedCategory}
              isEditing={editingDishId === dish.id}
              onEdit={() => {
                setEditingDishId(dish.id);
                setEditingCategory(selectedCategory);
              }}
              onDelete={() => handleDeleteDish(dish.id)}
              onUpdate={(updatedDish) => {
                onUpdateDish(selectedCategory, dish.id, updatedDish);
                setEditingDishId(null);
              }}
              onCancel={() => setEditingDishId(null)}
            />
          ))
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add Dish to {categoryLabels[selectedCategory]}</h2>
            <AddDishForm
              category={selectedCategory}
              onSubmit={(dishData) => {
                const newDish = {
                  id: Date.now(),
                  ...dishData
                };
                onAddDish(selectedCategory, newDish);
                setShowAddForm(false);
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function DishCard({ dish, category, isEditing, onEdit, onDelete, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({ ...dish });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  if (isEditing) {
    return (
      <div className="dish-card edit-mode">
        <div className="edit-form">
          <div className="form-group-inline">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Dish name"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              min="0"
              step="0.01"
            />
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="2"
          />
          <div className="form-actions-inline">
            <button className="cancel-btn" onClick={onCancel}>Cancel</button>
            <button className="save-btn" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dish-card">
      <div className="dish-icon">{dish.image || '🍽️'}</div>
      <div className="dish-content">
        <div className="dish-header">
          <h3>{dish.name}</h3>
          <span className="dish-price">₹{dish.price}</span>
        </div>
        <p className="dish-description">{dish.description}</p>
        {dish.type && <span className="dish-type">{dish.type === 'veg' ? '🥬' : '🍖'}</span>}
      </div>
      <div className="dish-actions">
        <button className="edit-dish-btn" onClick={onEdit} title="Edit">
          ✏️
        </button>
        <button className="delete-dish-btn" onClick={onDelete} title="Delete">
          🗑️
        </button>
      </div>
    </div>
  );
}

function AddDishForm({ category, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    type: 'veg',
    image: '🍽️'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.price) {
      onSubmit(formData);
      setFormData({
        name: '',
        price: '',
        description: '',
        type: 'veg',
        image: '🍽️'
      });
    }
  };

  return (
    <form className="add-dish-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Dish Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter dish name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price *</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the dish"
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Emoji/Icon</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="🍽️"
            maxLength="2"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Add Dish
        </button>
      </div>
    </form>
  );
}

export default ManageMenu;
