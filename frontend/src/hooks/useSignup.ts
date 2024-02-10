import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import apiconfig from "../config/api";

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setToken } = useAuthContext();

  const signup = async (email: string, name: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(apiconfig.signup, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setIsLoading(false);
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
    setUser(data.user);
    setToken(data.token);
    setIsLoading(false);
  };

  return { signup, error, isLoading };
};
