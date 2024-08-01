import React, { createContext, useContext, useState, useMemo } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const[flag,setFlag]=useState(false);
  const getCurrentUser = () => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    return storedUser;
  }
  const login = (user, token) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('jwt-token', token);
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('jwt-token');
  };

  const isLogin = useMemo(() => {
    return () => !!sessionStorage.getItem('user');
  }, []);

  return (
    <AuthContext.Provider value={{ getCurrentUser, isLogin, login, logout, loading, setLoading,flag,setFlag }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
