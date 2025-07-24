import React, { createContext, useState, useContext } from "react";

// Replace this with your actual live backend URL from Render
const API_BASE_URL = "https://github-profile-proxy.onrender.com";

// 1. Create the Context
const UserContext = createContext();

// 2. Create the Provider Component
// This component will wrap your application and provide the context value.

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bodyUser, setBodyUser] = useState(null);
  const [bodyRepo, setBodyRepo] = useState(null);

  const fetchUserData = async (username) => {
    if (!username) return;
    setIsLoading(true);
    setError(null);
    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/users/${username}`),
        fetch(`${API_BASE_URL}/api/users/${username}/repos`)
      ]);
      if (!userResponse.ok) {
        throw new Error(`User not found. Please try another username.`);
      }
      const userData = await userResponse.json();
      const reposData = reposResponse.ok ? await reposResponse.json() : [];
      setUser(userData);
      setRepos(reposData);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err.message);
      setUser(null);
      setRepos([]);
    } finally {
      setIsLoading(false);
    }
  };


  const clearUserData = () => {
    setUser(null);
    setRepos([]);
    setError(null);
  };

  const value = {
    user,
    repos,
    isLoading,
    error,
    fetchUserData,
    clearUserData,
    bodyUser,
    setBodyUser,
    bodyRepo,
    setBodyRepo // Expose the new function through the context
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
