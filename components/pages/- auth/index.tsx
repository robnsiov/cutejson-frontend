"use client";

import { useSearchParams } from "next/navigation";
import Authentication from "./authentication";
import { authType } from "./authentication/types";
import ForgotPassword from "./forgot-password";
import ForgotPasswordConfirmation from "./forgot-password-confirmation";

const Auth = () => {
  const searchParams = useSearchParams();
  const formParam = searchParams.get("form") ?? "signup";
  return (
    <>
      {(formParam === "signup" || formParam === "signin") && (
        <Authentication selectedForm={formParam.toUpperCase() as authType} />
      )}
      {formParam === "forgot-password" && <ForgotPassword />}
      {formParam === "forgot-password-confirmation" && (
        <ForgotPasswordConfirmation />
      )}
    </>
  );
};
export default Auth;
