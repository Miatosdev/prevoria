import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  balance: number;
  account_number: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    userData: Omit<User, "id" | "balance" | "account_number"> & { password: string }
  ) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  fetchUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const API_URL = "http://127.0.0.1:8000/api";

  useEffect(() => {
    const storedUser = localStorage.getItem("bankingUser");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/me`);
      const freshUser = { ...res.data, balance: Number(res.data.balance) };
      setUser(freshUser);
      localStorage.setItem("bankingUser", JSON.stringify(freshUser));
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const { token, user } = res.data;

      const normalizedUser = { ...user, balance: Number(user.balance) };

      setUser(normalizedUser);
      setToken(token);

      localStorage.setItem("bankingUser", JSON.stringify(normalizedUser));
      localStorage.setItem("authToken", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await fetchUser(); // get freshest user data from backend
      return true;
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      return false;
    }
  };

  const register = async (
    userData: Omit<User, "id" | "balance" | "account_number"> & { password: string }
  ): Promise<boolean> => {
    try {
      await axios.post(`${API_URL}/register`, userData);
      return await login(userData.email, userData.password); // auto-login
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data || error.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("bankingUser");
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("bankingUser", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateUser,
    fetchUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
