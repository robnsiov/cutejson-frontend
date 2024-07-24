"use client";
import { Toaster } from "@/components/ui/toaster";
import RootProviderTypes from "./types";
import useRootProvider from "./use";

const RootProvider = ({ children }: RootProviderTypes) => {
  useRootProvider();
  return (
    <>
      <div className="container mx-auto lg:px-8 px-0">{children}</div>
      <Toaster />
    </>
  );
};
export default RootProvider;
