/// <reference types="vite/client" />
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

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
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provides authentication state across the app.
 * - Optimistically loads from localStorage for instant UI rendering
 * - Validates against the server in the background
 * - Automatically clears stale sessions
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  // Optimistic: load immediately from localStorage to avoid flash
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('ascendix_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        credentials: 'include'
      });
      
      if (res.ok) {
        const { user: serverUser } = await res.json();
        setUser(serverUser);
        localStorage.setItem('ascendix_user', JSON.stringify(serverUser));
      } else {
        // Server says not authenticated — clear local state
        setUser(null);
        localStorage.removeItem('ascendix_user');
      }
    } catch (err) {
      // Network error — keep optimistic state but don't block
      console.error('Session check failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem('ascendix_user', JSON.stringify(userData));
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, { 
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      // Logout should always succeed client-side even if server call fails
    }
    
    setUser(null);
    localStorage.removeItem('ascendix_user');
    localStorage.removeItem('ascendix_token');
  }, []);

  const refreshSession = useCallback(async () => {
    setIsLoading(true);
    await checkSession();
  }, [checkSession]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshSession }}>
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
