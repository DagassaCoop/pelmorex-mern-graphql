import { useContext } from "react";
import { AuthContext } from "../app/providers/Auth.provider";

export default function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) throw new Error("useAuthContext must be used within a AuthContextProvider")

  return context
}