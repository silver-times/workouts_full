import { useAuthContext } from "./useAuthContext";

export const useSignout = () => {
  const { setUser, setToken } = useAuthContext();

  const signoutHandler = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return { signoutHandler };
};
