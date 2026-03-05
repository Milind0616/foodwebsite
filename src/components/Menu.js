import React, { useState } from 'react';
import { menuItems } from '../data';
import './Menu.css';

function Menu({ restaurant, onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [isLocationVerified, setIsLocationVerified] = useState(false);
  const [locationMessage, setLocationMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');

  // Use restaurant.menu for user-created restaurants, fallback to menuItems for static ones
  const menu = restaurant.menu && Object.keys(restaurant.menu).length > 0
    ? restaurant.menu
    : menuItems[restaurant.id] || {};
  const categories = Object.keys(menu);

  const getFilteredItems = () => {
    if (selectedCategory === 'all') {
      return Object.entries(menu).flatMap(([category, items]) => 
        items.map(item => ({ ...item, category }))
      );
    }
    return menu[selectedCategory]?.map(item => ({ ...item, category: selectedCategory })) || [];
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem.quantity > 1) {
      setCart(cart.map(cartItem => 
        cartItem.id === itemId 
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
    setOrderMessage('');
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
    setOrderMessage('');
  };

  const handleLocationChange = (value) => {
    setDeliveryLocation(value);
    setIsLocationVerified(false);
    setLocationMessage('');
  };

  const handleVerifyLocation = () => {
    if (!deliveryLocation.trim()) {
      setIsLocationVerified(false);
      setLocationMessage('Please enter a delivery location to verify.');
      return;
    }

    setIsVerifying(true);
    setLocationMessage('Verifying location...');

    setTimeout(() => {
      setIsVerifying(false);
      setIsLocationVerified(true);
      setLocationMessage('Location verified. You can place your order.');
    }, 800);
  };

  const handlePlaceOrder = () => {
    if (!isLocationVerified || cart.length === 0) {
      return;
    }

    setOrderMessage('Order placed successfully! Your food is on the way.');
    setCart([]);
    setIsCheckoutOpen(false);
    setDeliveryLocation('');
    setIsLocationVerified(false);
    setLocationMessage('');
  };

  return (
    <div className="menu-container">
      <header className="menu-header">
        <button className="back-button" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back to Restaurants</span>
        </button>

        <div className="restaurant-header-info">
          <div className="restaurant-header-content">
            <h1 className="restaurant-title">{restaurant.name}</h1>
            <p className="restaurant-details serif-text">
              {restaurant.cuisine} • {restaurant.deliveryTime}
            </p>
            <div className="restaurant-badges">
              <span className={`type-badge ${restaurant.type}`}>
                {restaurant.type === 'veg' ? 'Pure Veg' : 'Non-Veg'}
              </span>
              <span className="rating-badge">{restaurant.rating}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="menu-content">
        <aside className="category-sidebar">
          <h3 className="sidebar-title">Categories</h3>
          <div className="category-list">
            <button
              className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              <span>All Items</span>
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                <span>{category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="menu-items-section">
          <div className="section-header">
            <h2 className="section-title">
              {selectedCategory === 'all' ? 'All Items' : selectedCategory.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </h2>
            <p className="items-count">{getFilteredItems().length} items</p>
          </div>

          <div className="menu-items-grid">
            {getFilteredItems().map((item, index) => {
              const cartItem = cart.find(ci => ci.id === item.id);
              const quantity = cartItem?.quantity || 0;

              return (
                <div
                  key={item.id}
                  className="menu-item-card"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="item-content">
                    <div className="item-details">
                      <div className="item-header">
                        <h3 className="item-name">{item.name}</h3>
                        <span className={`item-type-indicator ${item.type}`}>
                          {item.type === 'veg' ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>
                      <p className="item-description">{item.description}</p>
                      <div className="item-footer">
                        <span className="item-price">₹{item.price}</span>
                        {quantity > 0 ? (
                          <div className="quantity-controls">
                            <button
                              className="quantity-btn"
                              onClick={() => removeFromCart(item.id)}
                            >
                              −
                            </button>
                            <span className="quantity-display">{quantity}</span>
                            <button
                              className="quantity-btn"
                              onClick={() => addToCart(item)}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            className="add-to-cart-btn"
                            onClick={() => addToCart(item)}
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {cart.length > 0 && (
        <div className="cart-floating">
          <div className="cart-summary">
            <div className="cart-info">
              <span className="cart-items-count">{getTotalItems()} items</span>
              <span className="cart-total">₹{getTotalAmount()}</span>
            </div>
            <button className="checkout-btn" onClick={handleOpenCheckout}>
              <span>Checkout</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {isCheckoutOpen && cart.length > 0 && (
        <div className="checkout-modal" role="dialog" aria-modal="true">
          <div className="checkout-card">
            <div className="checkout-header">
              <div>
                <h3 className="checkout-title">Checkout</h3>
                <p className="checkout-subtitle">Verify location to place your order</p>
              </div>
              <button className="checkout-close" onClick={handleCloseCheckout} aria-label="Close checkout">
                ✕
              </button>
            </div>

            <div className="checkout-content">
              <div className="checkout-section">
                <h4 className="checkout-section-title">Your Order</h4>
                <ul className="checkout-items">
                  {cart.map(item => (
                    <li key={item.id} className="checkout-item">
                      <span className="checkout-item-name">{item.name}</span>
                      <span className="checkout-item-qty">× {item.quantity}</span>
                      <span className="checkout-item-price">₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="checkout-total">
                  <span>Total</span>
                  <strong>₹{getTotalAmount()}</strong>
                </div>
              </div>

              <div className="checkout-section">
                <h4 className="checkout-section-title">Delivery Location</h4>
                <div className="location-form">
                  <input
                    type="text"
                    className="location-input"
                    placeholder="Enter your delivery address"
                    value={deliveryLocation}
                    onChange={(e) => handleLocationChange(e.target.value)}
                  />
                  <button
                    className="verify-btn"
                    onClick={handleVerifyLocation}
                    disabled={isVerifying}
                  >
                    {isVerifying ? 'Verifying...' : 'Verify Location'}
                  </button>
                </div>
                {locationMessage && (
                  <p className={`location-message ${isLocationVerified ? 'success' : 'warning'}`}>
                    {locationMessage}
                  </p>
                )}
              </div>
            </div>

            <div className="checkout-footer">
              <button className="checkout-secondary" onClick={handleCloseCheckout}>
                Continue Shopping
              </button>
              <button
                className="checkout-primary"
                onClick={handlePlaceOrder}
                disabled={!isLocationVerified || cart.length === 0}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {orderMessage && (
        <div className="order-toast">
          <span>{orderMessage}</span>
        </div>
      )}
    </div>
  );
}

export default Menu;
