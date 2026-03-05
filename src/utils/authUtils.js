// Authentication utilities for user management

const USERS_KEY = 'zyka_users';

// Initialize users in localStorage if not exists
export const initializeUsers = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
};

// Get all users
const getAllUsers = () => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

// Save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Register new user
export const registerUser = (username, email, password, role) => {
  try {
    initializeUsers();
    const users = getAllUsers();

    // Check if user already exists
    if (users.some(u => u.username === username)) {
      return { success: false, error: 'Username already exists' };
    }

    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      username,
      email,
      password, // In production, this should be hashed
      role,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    return { success: true, user: newUser };
  } catch (error) {
    return { success: false, error: 'Registration failed' };
  }
};

// Login user
export const loginUser = (username, password) => {
  try {
    initializeUsers();
    const users = getAllUsers();

    const user = users.find(u => u.username === username);

    if (!user) {
      return { success: false, error: 'Username not found' };
    }

    if (user.password !== password) {
      return { success: false, error: 'Incorrect password' };
    }

    return { success: true, user };
  } catch (error) {
    return { success: false, error: 'Login failed' };
  }
};

// Get user by username
export const getUserByUsername = (username) => {
  try {
    initializeUsers();
    const users = getAllUsers();
    return users.find(u => u.username === username);
  } catch (error) {
    return null;
  }
};

// Check if user exists
export const userExists = (username) => {
  try {
    initializeUsers();
    const users = getAllUsers();
    return users.some(u => u.username === username);
  } catch (error) {
    return false;
  }
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isValidPassword = (password) => {
  return password.length >= 6;
};

// Validate username (alphanumeric and underscore only)
export const isValidUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};
