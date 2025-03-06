import React, { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser, account, signOut } from "@/lib/appwrite";
// Remove router import as we're removing navigation from this provider
// import { router } from "expo-router";

// Define the context type
interface GlobalContextType {
  isLogged: boolean;
  user: any;
  loading: boolean;
  setIsLogged: (value: boolean) => void;
  setUser: (user: any) => void;
  setLoading: (value: boolean) => void;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  checkSession: () => Promise<boolean>;
}

// Create context with default values
const GlobalContext = createContext<GlobalContextType>({
  isLogged: false,
  user: null,
  loading: true,
  setIsLogged: () => {},
  setUser: () => {},
  setLoading: () => {},
  login: async () => null,
  logout: async () => null,
  checkSession: async () => false
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Check if there's an active session
  const checkSession = async (): Promise<boolean> => {
    try {
      const currentSession = await account.getSession('current');
      return !!currentSession;
    } catch (error) {
      return false;
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      // Check if there's already an active session
      const hasSession = await checkSession();
      
      // If there's an active session, delete it first
      if (hasSession) {
        try {
          await account.deleteSession('current');
        } catch (error) {
          console.error("Error deleting existing session:", error);
        }
      }
      
      // Create a new session
      const session = await account.createEmailPasswordSession(email, password);
      
      // Get user data
      const userData = await getCurrentUser();
      
      if (userData) {
        setIsLogged(true);
        setUser(userData);
      }
      
      return { session, userData };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut();
      setIsLogged(false);
      setUser(null);
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  // Effect to handle authentication state on app initialization and hot reload
  useEffect(() => {
    const initAuth = async () => {
      try {
        const hasSession = await checkSession();
        
        if (hasSession) {
          const userData = await getCurrentUser();
          if (userData) {
            setIsLogged(true);
            setUser(userData);
            
            // Remove navigation logic from here - components will handle this
          } else {
            // Session exists but no user data, clean up
            await account.deleteSession('current');
            setIsLogged(false);
            setUser(null);
          }
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        setIsLogged(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        setLoading,
        login,
        logout,
        checkSession
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;