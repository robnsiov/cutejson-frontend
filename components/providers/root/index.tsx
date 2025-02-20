"use client";
import { Toaster } from "@/components/ui/toaster";
import { CONTAINER_MAX_WIDTH } from "@/constants/sizes";
import cls from "classnames";
import { usePathname } from "next/navigation";
import RootProviderTypes from "./types";
import useRootProvider from "./use";

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
