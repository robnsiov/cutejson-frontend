"use client";
import { RecoilRoot } from "recoil";
import RecoilProviderProps from "./types";
const RecoilProvider = ({ children }: RecoilProviderProps) => {
  return (
    <>
      <RecoilRoot>{children}</RecoilRoot>
    </>
  );
};
export default RecoilProvider;
