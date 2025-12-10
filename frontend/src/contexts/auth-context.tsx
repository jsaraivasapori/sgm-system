"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";
import { authService, LoginRequest } from "../services/auth.service";

type AuthContextType = {
  signIn: (credentials: LoginRequest) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica o token ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  async function signIn(credentials: LoginRequest) {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem("access_token", response.access_token);
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (error) {
      throw error; // Repassa o erro para o form tratar
    }
  }

  function signOut() {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
