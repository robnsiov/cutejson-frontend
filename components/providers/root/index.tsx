"use client";
import { Toaster } from "@/components/ui/toaster";
import RootProviderTypes from "./types";
import useRootProvider from "./use";
import cls from "classnames";
import { usePathname } from "next/navigation";
import pages from "@/constants/pages";

const RootProvider = ({ children }: RootProviderTypes) => {
  useRootProvider();
  const pathname = usePathname();
  return (
    <>
      <div
        className={cls({
          "w-full max-w-7xl mx-auto":
            !pathname.includes(pages.dashboard) &&
            pathname.includes(pages.dashboard),
        })}
      >
        {children}
      </div>
      <Toaster />
    </>
  );
};
export default RootProvider;
