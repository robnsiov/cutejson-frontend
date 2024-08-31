import Link from "next/link";
import LinkElementProps from "./types";
import { twMerge } from "tailwind-merge";

const LinkElement = ({ children, href, className }: LinkElementProps) => {
  return (
    <>
      <Link
        href={href}
        className={twMerge(
          "md:text-2xl text-xl mt-6 underline transition-all duration-200 hover:text-slate-600",
          className
        )}
      >
        {children}
      </Link>
    </>
  );
};
export default LinkElement;
