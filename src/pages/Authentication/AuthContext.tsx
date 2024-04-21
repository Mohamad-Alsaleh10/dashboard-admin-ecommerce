// AuthProvider.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
   const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check local storage for saved status
    const savedStatus = localStorage.getItem('isAuthenticated');
    return savedStatus ? JSON.parse(savedStatus) : false;
  });

  const login = () => {
    setIsAuthenticated(true);
    // Save the status in local storage
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    navigate('/');
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Remove the status from local storage
    localStorage.setItem('isAuthenticated', JSON.stringify(false));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
