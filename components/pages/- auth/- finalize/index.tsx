"use client";

import apis from "@/constants/apis";
import userAtom from "@/recoil/user-atom";
import Axios from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import socialAuthConfirmationMutatuinProps from "./types";
import jsonDBAtom from "@/recoil/json-db-atom";

const AuthFinalize = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const code = searchParams.get("code");
  const [, setUser] = useRecoilState(userAtom);
  const [, setDB] = useRecoilState(jsonDBAtom);

  const confirmationError = () => {
    const channel = new BroadcastChannel("auth");
    channel.postMessage({
      error,
    });
    // window.close();
  };

  const socialAuthConfirmationMutatuin = useMutation({
    mutationFn: () =>
      Axios<socialAuthConfirmationMutatuinProps>({
        url: apis.socialAuthConfirmation,
        data: { code },
        method: "POST",
      }),
    mutationKey: ["social-auth-confirmation"],
    onSuccess(res) {
      const channel = new BroadcastChannel("auth");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("cute-json-token", res.data.db);
      // setUser({ status: "finish", data: { email: res.data.email } });
      // setDB({ db: res.data.db, status: "finish" });
      channel.postMessage({
        auth: true,
      });
      window.close();
    },
    onError() {
      confirmationError();
    },
  });

  useEffect(() => {
    if (code) {
      socialAuthConfirmationMutatuin.mutate();
    }
  }, [code]);

  useEffect(() => {
    if (error) {
      confirmationError();
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
