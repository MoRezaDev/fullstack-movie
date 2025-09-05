"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { useState } from "react";

export default function SwiperWrapper({ data }: { data: any }) {
  const [bgUrl, setBgUrl] = useState(data[0].content.images_url[0]);

  return (
    <div className="w-full relative h-full flex items-center">
      <div dir="rtl" className="absolute inset-0 bg-black overflow-hidden">
        <div className="w-full md:w-[65%] relative backdroptest">
          <img src={bgUrl} className="  size-full opacity-80   object-cover" />
          <div></div>
        </div>
      </div>
      <div className="max-w-[1280px]  relative  w-[95%] mx-auto  overflow-hidden mt-4">
        <Swiper
          loop={true}
          className="overflow-hidden"
          onSlideChange={(swiper) => {
            const currentIndex = swiper.realIndex;
            setBgUrl(data[currentIndex].content.images_url[0]);
          }}
          slidesPerView={6}
          autoplay={{ pauseOnMouseEnter: true, delay: 3000 }}
          breakpoints={{
            250: { slidesPerView: 2 },
            450: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1000: { slidesPerView: 6 },
          }}
          modules={[Autoplay]}
          spaceBetween={20}
        >
          {data.map((item: any) => (
            <SwiperSlide key={item.title}>
              <Link href={item.slug} className="cursor-pointer">
                <div className="group w-full aspect-[2/3] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 relative text-[10px] flex flex-col ">
                  <img
                    src={item.content.poster}
                    className="w-full h-full object-cover "
                    alt={item.title}
                  />
                  <div
                    dir="rtl"
                    className="absolute bg-black/70 bottom-0 p-2 w-full h-[16%] flex items-center justify-center transition-transform duration-400 group-hover:scale-0"
                  >
                    <span className="text-center">
                      دانلود {item.content.title}
                    </span>
                  </div>
                  <div
                    dir="rtl"
                    className="absolute w-full h-full transition-transform duration-400 scale-0 bg-black/20 inset-0 p-2 flex flex-col gap-2 backdrop-blur-[1px] group-hover:scale-100"
                  >
                    <h3 className="mt-2 border-b p-2">
                      {item.title} با لینک های ویژه
                    </h3>

                    <div className="grid grid-cols-3 gap-2 w-full mt-auto">
                      {item.content.genre.map((genre: any, idx: number) => (
                        <div
                          key={idx}
                          className="px-2 py-1 bg-black/50 rounded-md text-[10px] flex items-center justify-center"
                        >
                          <span className="text-center">{genre}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
