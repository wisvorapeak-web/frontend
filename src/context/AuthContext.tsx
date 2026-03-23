/// <reference types="vite/client" />
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  institution?: string;
  status?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          credentials: 'include' // Always send cookies
        });
        
        if (res.ok) {
          const { user } = await res.json();
          setUser(user);
          localStorage.setItem('ascendix_user', JSON.stringify(user));
        } else {
          // If 401, clear user state
          setUser(null);
          localStorage.removeItem('ascendix_user');
        }
      } catch (err) {
        console.error('Session check failed');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('ascendix_user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, { 
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {}
    
    setUser(null);
    localStorage.removeItem('ascendix_user');
    localStorage.removeItem('ascendix_token'); // Cleanup old artifacts
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
