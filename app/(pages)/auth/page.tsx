import Auth from "@/components/pages/- auth";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Sign In, Sign Up & Password Recovery - Cute JSON",
  description:
    "Access your Cute JSON account with ease. Sign in, create a new account, or recover your password all from one convenient page.",
  keywords:
    "authentication, sign in, sign up, forgot password, login, register, account recovery, Cute JSON",
};

const Page = () => {
  return (
    <>
      <Auth />
    </>
  );
};
export default Page;
