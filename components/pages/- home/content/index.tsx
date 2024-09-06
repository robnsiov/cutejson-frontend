import Card from "./card";
import Title from "../title";
import Carousel from "../carousel";
import Link from "next/link";
import pages from "@/constants/pages";
import LinkElement from "./link";
import carouselData from "./data";

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
          {carouselData.map(({ description, title }, i) => (
            <Card
              key={title}
              className="flex"
              desc={description}
              number={`0${i + 1}`}
              title={title}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Content;
