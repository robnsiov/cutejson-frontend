"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../content/card";
import carouselData from "../content/data";

const Carousel = () => {
  return (
    <>
      <div className="lg:hidden w-full border-x-[1px] border-l-stone-300">
        <Swiper
          className="w-[calc(100%+12*4*2px)] -right-12 -left-12 min-h-[155px]"
          loop={true}
          slidesPerView={"auto"}
          centeredSlides={true}
        >
          {carouselData.map(({ description, title }, i) => (
            <SwiperSlide className="!w-auto" key={title}>
              <div className="relative w-[300px] bg-white border-[1px] border-slate-300">
                <Card
                  containerClassName="flex"
                  className="flex"
                  desc={description}
                  number={`0${i + 1}`}
                  title={title}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
export default Carousel;
