import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

// Types
import { TUser, TUserWithToken, TNewUser } from "../types/User.type";

// Mutations & Queries
import { LOGIN, SIGNUP } from "../../graphql/mutations/user.mutation";

type TAuthContext = {
  authUser: TUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  authLogin: (credentials: { email: string; password: string }) => void;
  authSighUp: (newUser: TNewUser) => void;
  logOut: () => void;
};

export const AuthContext = createContext<TAuthContext | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();

  // State
  const [authUser, setAuthUser] = useState<TUser | null>(null);

  // Log In
  const [login, { error: loginError }] = useMutation<{
    login: TUserWithToken;
  }>(LOGIN);

  const authLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await login({
        variables: { input: credentials },
      });

      if (res.data) {
        const token = res.data.login.userJwtToken.token;
        const user = res.data.login.user;

        localStorage.setItem("token", token);
        setAuthUser(user);

        navigate("/listing");
        return;
      }

      if (loginError) throw new Error(loginError.message);
    } catch (error) {
      console.log("AuthProvider > authLogin > Error >> ", error);
    }
  };

  // Sign Up
  const [signUp, { error: sighUpError }] = useMutation<{
    signUp: TUserWithToken;
  }>(SIGNUP);

  const authSighUp = async (newUser: TNewUser) => {
    try {
      const res = await signUp({
        variables: {
          input: newUser,
        },
      });

      if (res.data) {
        const user = res.data.signUp.user;
        const token = res.data.signUp.userJwtToken.token;

        localStorage.setItem("token", token);
        setAuthUser(user);

        navigate("/listing");
      }

      if (sighUpError) throw new Error(sighUpError.message);
    } catch (error) {
      console.log("AuthProvider > authSighUp > Error >> ", error);
    }
  };

  // Log Out
  const logOut = () => {
    setAuthUser(null);
    localStorage.removeItem("token");
  };

  const { pathname } = location;
  const inAuthPages = pathname === "/login" || pathname === "/registration";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!inAuthPages && !authUser && !token) {
      navigate("/login");
    }
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, authLogin, authSighUp, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
