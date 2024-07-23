"use client";

import userAtom from "@/recoil/user-atom";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";

const AuthFinalize = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const cuteJsonToken = searchParams.get("db");
  const token = searchParams.get("token");
  const error = searchParams.get("error");
  const [_, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    if (token && email && cuteJsonToken) {
      const channel = new BroadcastChannel("auth");
      localStorage.setItem("token", token);
      localStorage.setItem("cute-json-token", cuteJsonToken);
      setUser({ status: "finish", data: { email } });
      channel.postMessage({
        auth: true,
      });
      window.close();
    }
  }, [email, cuteJsonToken, token]);

  useEffect(() => {
    if (error) {
      const channel = new BroadcastChannel("auth");
      channel.postMessage({
        error,
      });
      window.close();
    }
  }, [error]);

  return (
    <>
      <div className="absolute inset-0 z-50">
        <div className="w-full flex justify-center items-center mt-[50px]">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </div>
    </>
  );
};
export default AuthFinalize;
