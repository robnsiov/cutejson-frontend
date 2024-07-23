"use client";

import { useSearchParams } from "next/navigation";
import Authentication from "./authentication";
import { authType } from "./authentication/types";

const Auth = () => {
  const searchParams = useSearchParams();
  const formParam = searchParams.get("form") ?? "signup";
  return (
    <>
      {(formParam === "signup" || formParam === "signin") && (
        <Authentication selectedForm={formParam.toUpperCase() as authType} />
      )}
    </>
  );
};
export default Auth;
