import CardProps from "./types";
import { twMerge } from "tailwind-merge";

const Card = ({
  desc,
  number,
  title,
  className,
  containerClassName,
}: CardProps) => {
  return (
    <>
      <div
        className={twMerge(
          "w-full lg:flex hidden justify-start items-start flex-col",
          containerClassName
        )}
      >
        <div
          className={twMerge(
            "w-full p-4 flex justify-start items-center border-b-[1px] border-slate-300",
            className
          )}
        >
          <span className="mr-2 text-gray-400">{number}.</span>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="w-full lg:h-[150px] md:h-[180px] p-4 text-xs">
          {desc}
        </div>
      </div>
    </>
  );
};

export default Card;
