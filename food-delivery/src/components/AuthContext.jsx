import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('role');
    const storedUserName = localStorage.getItem('username');
    if (storedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setUserId(storedUserId);
    setToken(storedToken);
    setRole(storedRole);
    setUserName(storedUserName);
    setLoading(false); // Set loading to false after the effect runs
  }, []);

  const login = (token, id, role, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
    setIsLoggedIn(true);
    setUserId(id);
    setToken(token);
    setRole(role);
    setUserName(username);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUserId(null);
    setToken(null);
    setRole(null);
    setUserName(null);
  };

  // If loading is true, show a loading spinner or return null
  if (loading) {
    return <div>Loading...</div>; // Or return some loading indicator
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, token, role, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

