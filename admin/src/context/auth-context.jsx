import { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoading: true,
    token: null,
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get("/auth/check");
        setAuth({ isLoading: false, token: res.data.token });
      } catch (error) {
        setAuth({ isLoading: false, token: null });
      }
    };
    verifyToken();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("menu");
    setAuth({
      isLoading: false,
      token: null,
    });
  };

  const login = (token) => {
    setAuth({
      isLoading: false,
      token,
    });
  };

  return (
    <AuthContext.Provider value={{ login, logout, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
