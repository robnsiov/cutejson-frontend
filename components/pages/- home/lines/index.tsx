import cls from "classnames";
import Line from "./line";

const Lines = () => {
  return (
    <>
      <div className="absolute inset-0 px-12 grid grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Line
            key={i}
            className={cls(`flex justify-start items-end relative z-10`, {
              "border-r-[1px]": i + 1 === 5,
            })}
          ></Line>
        ))}
      </div>
    </>
  );
};
export default Lines;
