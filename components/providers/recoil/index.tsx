"use client";
import { RecoilRoot } from "recoil";
import RecoilProvderProps from "./types";
const RecoilProvder = ({ children }: RecoilProvderProps) => {
  return (
    <>
      <RecoilRoot>{children}</RecoilRoot>
    </>
  );
};
export default RecoilProvder;
