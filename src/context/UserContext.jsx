import React, { createContext, useState, useEffect, useContext } from 'react';

// Criando o contexto do usuário
const UserContext = createContext();

// Hook para facilitar o acesso ao contexto do usuário
export const useUser = () => {
  return useContext(UserContext);
};

// Provider para o UserContext
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Função de login que também salva os dados do usuário no localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Função de logout que remove o usuário do localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Checar se o usuário é admin
  const isAdmin = () => {
    return user?.usuario?.roles === 'admin';
  };

  // Efeito para verificar se o usuário já está no localStorage ao carregar a página
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
