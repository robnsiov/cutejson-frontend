import pages from "@/constants/pages";
import LinkElement from "../content/link";

const Title = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <h1
          className="uppercase  md:text-[89px] text-[12vw]  md:leading-none
           leading-[1] flex flex-col justify-start lg:items-start 
        items-center
        lg:text-right text-center"
        >
          <span className="font-extralight ">design data</span>
          <span className="relative lg:right-24 md:right-12">
            & create /foo
          </span>
          <div
            className="relative lg:-right-24 md:-right-12 font-semibold flex justify-end items-center
          sm:flex-row flex-col"
          >
            <span className="text-lg mr-4">in</span> cute-json
          </div>
        </h1>
        <LinkElement href={pages.dashboard}>Get Started</LinkElement>
      </div>
    </>
  );
};
export default Title;
