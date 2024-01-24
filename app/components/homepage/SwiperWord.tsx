"use client";
//  import Swiper from 'swiper'
import React from "react";
import {
  Navigation,
  EffectFlip,
  Pagination,
  EffectCards,
  Autoplay,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";

// const swiper = new Swiper('.swiper', {
//     modules: [Navigation, EffectFlip, Pagination],

//     direction: 'vertical',
//     loop: true,

//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//     },

//     // Navigation arrows
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },

//     // And if we need scrollbar
//     scrollbar: {
//       el: '.swiper-scrollbar',
//     },
// })

export default function SwiperWord() {

  const wordList = [
    {
      ger: 'uns',
      eng: 'Us'
    },
    {
      ger: 'dich',
      eng: 'you'
    },
    {
      ger: 'lernen',
      eng: 'learn'
    },
    {
      ger: 'sie',
      eng: 'she'
    },
    {
      ger: 'ihr',
      eng: 'her'
    },
    {
      ger: 'Ihnen',
      eng: 'Them'
    },
    {
      ger: 'Heute',
      eng: 'today'
    },
  ]

  const swiperJsx = (
    <>
    {wordList.map((w, index) => (
      <SwiperSlide key={index} className={` ${index % 2 == 1 ? 'bg-yellow-600' : 'bg-yellow-600'} duration-700  w-full rounded-t-xl`}>
        <div  className="w-full h-full flex items-center justify-evenly flex-row text-3xl py-6 px-8 pb-8 text-white ">
            <p className="w-full -skew-x-12 font-bold text-4xl">{w.ger}</p>
            <button className=" -skew-x-12" onClick={() => {console.log(index)}}>:</button>
            <p className="w-full -skew-x-12 font-bold text-4xl">{w.eng}</p>
          </div>
      </SwiperSlide>
    ))}
    </>
  )

  return (
    <>
      <Swiper
        effect="cards"
        modules={[EffectFlip, Pagination, Navigation, EffectCards, Autoplay]}
        grabCursor={true}
        pagination={{ clickable: true}}
        navigation={false}
        autoplay={{
          delay:3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        loopPreventsSliding={false}
        // loopAdditionalSlides={8}
        // loopAddBlankSlides={true}
        className="mySwiper  text-center transition-all  duration-1000 w-1/2  "
      >
        {swiperJsx}
        {/* <SwiperSlide className=" bg-violet-700 w-full  ">
          <div className="w-full h-full flex items-center justify-center ">
            <p className="w-full">Slide 1</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="bg-purple-800  w-full">
          <div className="w-full h-full flex items-center justify-center">
            <p className="w-full">Slide 2</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <p>Slide 3</p>
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
