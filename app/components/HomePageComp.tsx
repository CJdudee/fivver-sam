"use client";
import React, { useState } from "react";
import SlideShow from "./SlideShow";
import SlideShowTest from "./SlideShowTest";
import Show from "./Show";
import SwiperWord from "./homepage/SwiperWord";
import WhyUs from "./homepage/WhyUs";

export default function HomePageComp() {
  const [horzItem, setHorzItem] = useState(5);

  const displayList = [
    {
      name: "Teacher",
      text: "Native German speaker",
    },
    {
      name: "Dedicated",
      text: "Your own personal teacher, following you each step of the way",
    },
    {
      name: "Expertize",
      text: "Your teacher has a university degree in German language",
    },
    {
      name: "Personal",
      text: "We are a small team of experts, but we are big on personal touch",
    },
    {
      name: "Flexible",
      text: "From our reschedule/cancel policy to anything you need, your teacher is there for you",
    },
  ];

  return (
    <div className=" justify-start  flex flex-col min-h-full items-center max-w-full ">
      <div className="flex justify-between items-center flex-col h-[50dvh] md:h-[60dvh] md:py-4 ">
        <h3 className=" h-[25dvh] text-3xl md:text-6xl font-mono font-bold  text-center cursor-default drop-shadow-lg flex flex-col justify-around items-center   box-border w-full md:w-2/3  ">
          <div className="flex justify-center items-center gap-4 md:gap-8 bg-slate-400 px-4 rounded-lg drop-shadow-2xl">
          <span className="">Lang-go</span>
          <div className=" w-7 h-7 md:w-10 md:h-10  relative">
            <div className="h-1/3 absolute top-0 w-full bg-black" />
            <div className="h-1/3 absolute top-0 bottom-0 my-auto w-full bg-red-500" />
            <div className="h-1/3 absolute bottom-0 w-full bg-yellow-500" />
          </div>
          </div>
          <p>Where you can learn german with ease</p>
        
        </h3>

        <div className=" w-1/8 md:w-1/4  h-[25dvh]  flex justify-center ">
          <SwiperWord />
        </div>
      </div>
      

      <div className="w-[99dvh] h-[43dvh] md:h-[33dvh] overflow-x-hidden flex flex-col items-start justify-start py-8">
        <SlideShowTest />
      </div>

      {/* <div className="h-[93dvh]"> */}
      <div className=" rounded md:px-8 w-full md:w-3/4 border-t border-black py-3">
        <WhyUs />
      </div>

      {/* <div className=" bg-violet-200 w-full rounded-full h-full flex justify-center">
        <div className=" w-1/2 flex justify-center">
          <ul className="text-center py-8 font-sans text-3xl grid grid-flow-col gap-14 overflow-x-scroll w-2/3 rounded-full px-24 snap-x overscroll-contain  ">
            {displayList.map((d) => {
              return (
                <li className=" w-full bg-slate-400 ">
                <div className="w-80 flex flex-col  items-center gap-8">

                  <p>{d.name}</p>
                  <p>{d.text}</p>
                </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div> */}

      {/* <div className="scroll  w-full rounded-full h-full flex justify-center">
        
          <ul className=" scroll-slide text-center py-8 font-sans text-3xl grid grid-flow-col gap-14 overflow-x-scroll w-2/3 rounded-full px-24 snap-x overscroll-contain overflow-scroll ">
            {displayList.map((d) => {
              return (
                <li className="  bg-slate-400 flex justify-center items-center rounded-xl ">
                <div className="w-80 pb-8 flex flex-col gap-8 text-white font-bold font-serif">

                  <p>{d.name}:</p>
                  <p>{d.text}</p>
                </div>
                </li>
              );
            })}
          </ul>
       
      </div> */}
    </div>
  );
}


{/* <div className="bg-blue-400 w-full rounded-full h-full flex justify-center">
  <div className=" w-2/3">
    <ul className="text-center py-8 font-sans text-3xl flex justify-center gap-10 overflow-x-scroll w-full ">
      {displayList.map((d) => {
        return (
          <li className="w-1/2 bg-slate-400">
          <div className="w-full">

            <p>{d.name}</p>
          </div>
          </li>
        );
      })}
    </ul>
  </div>
</div> */}