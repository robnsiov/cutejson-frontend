"use client";
import { Toaster } from "@/components/ui/toaster";
import RootProviderTypes from "./types";
import useRootProvider from "./use";
import cls from "classnames";
import { usePathname } from "next/navigation";
import pages from "@/constants/pages";
import { CONTAINER_MAX_WIDTH } from "@/constants/sizes";

const RootProvider = ({ children }: RootProviderTypes) => {
  useRootProvider();
  const pathname = usePathname();
  return (
    <>
      <div
        style={{ maxWidth: `${CONTAINER_MAX_WIDTH}px` }}
        className={cls(`w-full mx-auto`, {
          "border-slate-200 border-x": pathname.includes("dashboard"),
        })}
      >
        {children}
      </div>
      <Toaster />
    </>
  );
};
export default RootProvider;
