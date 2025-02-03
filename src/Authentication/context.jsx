import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ displayName: null, email: null });

  const signIn = (userData) => {
    const { displayName, email } = userData;
    setUser({ displayName, email });
    console.log({ displayName, email });
  };

  const signOut = () => {
    setUser({ displayName: null, email: null });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};