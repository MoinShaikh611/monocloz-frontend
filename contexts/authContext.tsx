// contexts/AuthContext.tsx
"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface AuthContextProps {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  loggedIn: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = (): AuthContextProps => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const initialLoggedIn =
      typeof localStorage !== "undefined" &&
      localStorage.getItem("loggedIn") === "true";
    setLoggedIn(initialLoggedIn);
  }, []);

  const login = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("loggedIn", "true");
    }
    setLoggedIn(true);
  };

  const logout = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("loggedIn", "false");
    }
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
