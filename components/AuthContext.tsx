// import "../polyfills";
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";
// import { provider } from "@/cbConfig";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   isLoaded: boolean;
//   addresses: string[];
//   connect: () => Promise<void>;
//   disconnect: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [addresses, setAddresses] = useState<string[]>([]);

//   useEffect(() => {
//     setIsLoaded(true);
//     provider.addListener("accountsChanged", handleAccountsChanged);
//     provider.addListener("disconnect", handleDisconnect);

//     return () => {
//       provider.removeListener("accountsChanged", handleAccountsChanged);
//       provider.removeListener("disconnect", handleDisconnect);
//     };
//   }, []);

//   const handleAccountsChanged = (newAddresses: string[]) => {
//     if (newAddresses.length > 0) {
//       setAddresses(newAddresses);
//       setIsAuthenticated(true);
//     } else {
//       setAddresses([]);
//       setIsAuthenticated(false);
//     }
//   };

//   const handleDisconnect = () => {
//     setAddresses([]);
//     setIsAuthenticated(false);
//   };

//   const connect = useCallback(async () => {
//     try {
//       const newAddresses = (await provider.request({
//         method: "eth_requestAccounts",
//       })) as string[];
//       if (newAddresses.length > 0) {
//         setAddresses(newAddresses);
//         setIsAuthenticated(true);
//       }
//     } catch (error) {
//       console.error("Connection failed:", error);
//       throw error;
//     }
//   }, []);

//   const disconnect = useCallback(async () => {
//     try {
//       console.log("disconnecting");
//       await provider.disconnect();
//       // The handleDisconnect function will be called automatically due to the event listener
//     } catch (error) {
//       console.error("Disconnection failed:", error);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, isLoaded, addresses, connect, disconnect }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
