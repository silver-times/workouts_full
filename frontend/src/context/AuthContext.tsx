import React, { createContext, useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
  id: number;
  password: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
});

interface ChildrenProps {
  children: React.ReactNode;
}

const AuthContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userJSON) {
      setUser(JSON.parse(userJSON!));
    }

    if (token) {
      setToken(JSON.parse(token!));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
