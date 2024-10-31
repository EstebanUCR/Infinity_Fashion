import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  loginUser: (userData: User) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Función para iniciar sesión
  const loginUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Guardar en localStorage
  };

  // Función para cerrar sesión
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user'); // Eliminar del localStorage
  };

  // Restaurar sesión desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
