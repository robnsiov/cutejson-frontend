"use client";
import { RecoilRoot } from "recoil";
import RecoilProvderTypes from "./types";
const RecoilProvder = ({ children }: RecoilProvderTypes) => {
  return (
    <>
      <RecoilRoot>{children}</RecoilRoot>
    </>
  );
};
export default RecoilProvder;
