import { createContext, useContext, useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await api.get("/auth/me");
        setUser(response.data);
      }
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      // Static login for testing
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

      if (username === "admin" && password === "admin123") {
        const testUser = {
          id: "ADM001",
          name: "Admin User",
          role: "admin",
          department: "Management",
        };
        localStorage.setItem("token", "test-token");
        setUser(testUser);
        navigate("/admin");
        return { success: true };
      } else if (username === "EMP001" && password === "password") {
        const testUser = {
          id: "EMP001",
          name: "John Doe",
          role: "employee",
          department: "IT",
        };
        localStorage.setItem("token", "test-token");
        setUser(testUser);
        navigate("/");
        return { success: true };
      } else {
        return {
          success: false,
          error: "Invalid credentials",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "An error occurred during login",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/admin/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Temporary mock function - replace with actual API call
const mockLogin = async (employeeId, password) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (employeeId === "EMP001" && password === "password") {
    return {
      user: {
        id: "EMP001",
        name: "John Doe",
        role: "employee",
        department: "IT",
      },
    };
  }
  throw new Error("Invalid credentials");
};
