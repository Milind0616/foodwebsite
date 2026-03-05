import React, { useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Restaurants from './components/Restaurants';
import Menu from './components/Menu';
import RestaurantOwnerDashboard from './components/RestaurantOwnerDashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'restaurants', 'menu', 'owner_dashboard'
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'customer' or 'restaurant_owner'
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurants, setRestaurants] = useState(() => {
    // Load from localStorage and fallback to data.js
    const stored = localStorage.getItem('restaurants');
    let baseRestaurants = require('./data').restaurants;
    let ownerRestaurants = [];
    // Scan localStorage for owner-added restaurants
    for (let key in localStorage) {
      if (key.startsWith('restaurant_')) {
        try {
          const r = JSON.parse(localStorage.getItem(key));
          if (r && r.id && r.name) ownerRestaurants.push(r);
        } catch {}
      }
    }
    // Merge static and owner restaurants, avoiding duplicates by id
    const merged = [...baseRestaurants];
    ownerRestaurants.forEach(or => {
      if (!merged.some(r => r.id === or.id)) merged.push(or);
    });
    if (stored) {
      // If global restaurants exist, use them
      return JSON.parse(stored);
    }
    return merged;
  });

  // Keep restaurants in sync with localStorage
  React.useEffect(() => {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }, [restaurants]);
  const handleLogin = (username, role) => {
    setCurrentUser(username);
    setUserRole(role);
    if (role === 'restaurant_owner') {
      setCurrentView('owner_dashboard');
    } else {
      setCurrentView('restaurants');
    }
  };

  const handleSignUpClick = () => {
    setCurrentView('signup');
  };

  const handleSignUpSuccess = (user) => {
    setCurrentView('login');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentView('menu');
  };

  const handleBackToRestaurants = () => {
    setSelectedRestaurant(null);
    setCurrentView('restaurants');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setSelectedRestaurant(null);
    setCurrentView('login');
  };

  return (
    <div className="App">
      {currentView === 'login' && (
        <Login onLogin={handleLogin} onSignUpClick={handleSignUpClick} />
      )}

      {currentView === 'signup' && (
        <SignUp onSignUpSuccess={handleSignUpSuccess} onBackToLogin={handleBackToLogin} />
      )}

      {currentView === 'restaurants' && userRole === 'customer' && (
        <Restaurants 
          restaurants={restaurants}
          onSelectRestaurant={handleSelectRestaurant}
          username={currentUser}
          onLogout={handleLogout}
        />
      )}

      {currentView === 'menu' && selectedRestaurant && userRole === 'customer' && (
        <Menu 
          restaurant={selectedRestaurant}
          onBack={handleBackToRestaurants}
        />
      )}

      {currentView === 'owner_dashboard' && userRole === 'restaurant_owner' && (
        <RestaurantOwnerDashboard 
          restaurants={restaurants}
          setRestaurants={setRestaurants}
          username={currentUser}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
