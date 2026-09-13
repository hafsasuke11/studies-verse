import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const register = async (name, email, password) => {
    try {
      setError("");

      const response = await axios.post(
        "http://localhost:5000/api/register",
        {
          name,
          email,
          password,
        }
      );

      return { success: true, data: response.data };
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registration failed";
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const login = async (email, password) => {
    try {
      setError("");

      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      setUser(user);

      return { success: true, data: response.data };
    } catch (err) {
      const msg =
        err.response?.data?.error || "Login failed";
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/profile"
      );
      setUser(response.data.user);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
