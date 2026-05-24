import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const isLoggedIn = true;

  return (
    <AuthContext.Provider value={isLoggedIn}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
