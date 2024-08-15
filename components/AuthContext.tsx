import '../polyfills'; 

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { provider } from "@/cbConfig";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoaded: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    provider.addListener("accountsChanged", handleAccountsChanged);
    provider.addListener("disconnect", handleDisconnect);

    return () => {
      provider.removeListener("accountsChanged", handleAccountsChanged);
      provider.removeListener("disconnect", handleDisconnect);
    };
  }, []);

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      setAddress(accounts[0]);
      setIsAuthenticated(true);
    } else {
      setAddress(null);
      setIsAuthenticated(false);
    }
  };

  const handleDisconnect = () => {
    setAddress(null);
    setIsAuthenticated(false);
  };

  const connect = useCallback(async () => {
    try {
      const accounts = (await provider.request({
        method: "eth_requestAccounts",
      })) as string[];
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Connection failed:", error);
      throw error;
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await provider.disconnect();
    } catch (error) {
      console.error("Disconnection failed:", error);
    } finally {
      setAddress(null);
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoaded, address, connect, disconnect }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
