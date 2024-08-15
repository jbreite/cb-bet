// hooks/useDisconnect.ts
import { useAuth } from "@/components/AuthContext";
import { useCallback } from "react";

export const useDisconnect = () => {
  const { disconnect } = useAuth();

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
      // The routing back to the unauthenticated area is handled in _layout.tsx
    } catch (error) {
      console.error("Disconnection failed:", error);
      // You can handle the error here (e.g., show a toast or alert)
      throw error; // Rethrow the error if you want to handle it in the component
    }
  }, [disconnect]);

  return handleDisconnect;
};
