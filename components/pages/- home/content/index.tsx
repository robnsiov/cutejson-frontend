import Card from "./card";
import Title from "../title";
import Carousel from "../carousel";
import Link from "next/link";
import pages from "@/constants/pages";
import LinkElement from "./link";

const Content = () => {
  return (
    <>
      <div className="w-full h-full relative z-10 flex justify-between items-center flex-col">
        <div className="w-full flex justify-between items-center">
          <LinkElement className="md:ml-3" href={`${pages.auth}?form=signin`}>
            Sign-in
          </LinkElement>
          <LinkElement className="md:mr-3" href={`${pages.auth}?form=signup`}>
            Sign-up
          </LinkElement>
        </div>
        <Title />
        <Carousel />
        <div className="w-full grid grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card
              key={i}
              className="flex"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
      suscipit architecto nostrum similique nulla illo commodi quos iusto
      fugit pariatur perferendis"
              number={`0${i + 1}`}
              title="Projects"
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Content;
