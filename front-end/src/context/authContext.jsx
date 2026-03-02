/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ La fonction de check séparée, sans useCallback
  const refreshAuth = async () => {
    try {
      const res = await fetch("http://localhost:3000/me", {
        credentials: "include",
      });
      setIsLoggedIn(res.ok);
    } catch {
      setIsLoggedIn(false);
    }
  };

  // ✅ On appelle la logique directement dans le useEffect
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/me", {
          credentials: "include",
        });
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth(); // appelé une fois au montage, pas de dépendance problématique
  }, []); // tableau vide = une seule fois au montage ✅

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
