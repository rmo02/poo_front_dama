import React, { createContext, useState, useContext } from 'react';

// Criando o contexto do usuário
const UserContext = createContext();

// Hook para facilitar o acesso ao contexto do usuário
export const useUser = () => {
  return useContext(UserContext);
};

// Provider para o UserContext
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Checar se o usuário é admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
