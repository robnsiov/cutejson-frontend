"use client";
import { Loader2 } from "lucide-react";
import AuthProviderProps from "./types";
import useAuthProvider from "./use";

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { jsonToken, user } = useAuthProvider();

  return (
    <>
      {(jsonToken.status === "loading" || user.status === "loading") && (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      )}
      {jsonToken.status === "finish" && user.status === "error" && (
        <div className="px-4">{children}</div>
      )}
    </>
  );
};
export default AuthProvider;
