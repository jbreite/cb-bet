// hooks/useConnect.ts
import { useAuth } from "@/components/AuthContext";
import { useCallback } from "react";

export const useConnect = () => {
  const { connect } = useAuth();

  const handleConnect = useCallback(async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Connection failed:", error);
      // You can handle the error here (e.g., show a toast or alert)
    }
  }, [connect]);

  return handleConnect;
};


