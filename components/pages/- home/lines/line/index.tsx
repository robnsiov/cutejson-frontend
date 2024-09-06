import cls from "classnames";
import LineProps from "./types";
import { PropsWithChildren } from "react";

const Line = ({ className, children }: LineProps & PropsWithChildren) => {
  return (
    <>
      <div
        className={cls("h-screen border-l-[1px] border-slate-300", className)}
      >
        {children}
      </div>
    </>
  );
};
export default Line;
