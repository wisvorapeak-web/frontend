/// <reference types="vite/client" />
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  institution?: string;
  status?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persisted user session
    const storedUser = localStorage.getItem('wisvora_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem('wisvora_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('wisvora_user', JSON.stringify(userData));
    localStorage.setItem('wisvora_token', token);
    // Note: Cookie is also set by backend for HTTP-only security
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wisvora_user');
    localStorage.removeItem('wisvora_token');
    // Backend logout should clear the cookie
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, { method: 'POST' });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
